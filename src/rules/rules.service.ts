import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Rule, RuleDocument } from "./schemas/rule.schema";
import { ActionsService } from "../actions/actions.service";
import { Action } from "../actions/schemas/action.schema";
import { TicketsService } from "src/tickets/tickets.service";

@Injectable()
export class RulesService {
  constructor(
    @InjectModel(Rule.name) private ruleModel: Model<RuleDocument>,
    private actionsService: ActionsService,
    private ticketsService: TicketsService,
  ) {}

  async create(ruleData: Partial<Rule>): Promise<Rule> {
    // Generate IDs for nested actions
    const processActions = (actions: Action[]): Action[] => {
      return actions.map((action) => ({
        ...action,
        id: new Types.ObjectId(), // Generate new ID
        responses: action.responses
          ? Object.fromEntries(
              Object.entries(action.responses).map(([key, actions]) => [
                key,
                processActions(actions),
              ]),
            )
          : {},
      }));
    };

    const ruleToCreate = {
      ...ruleData,
      id: new Types.ObjectId(),
      thenConditions: ruleData.thenConditions
        ? processActions(ruleData.thenConditions)
        : [],
      elseConditions: ruleData.elseConditions
        ? processActions(ruleData.elseConditions)
        : [],
    };

    const createdRule = new this.ruleModel(ruleToCreate);
    const savedRule = await createdRule.save();
    return savedRule;
  }

  findActionsByRuleId(ruleId: string): Promise<Action[]> {
    return this.actionsService.findByRuleId(ruleId);
  }

  async findAll(): Promise<Rule[]> {
    return this.ruleModel.find().exec();
  }

  async findOne(id: string): Promise<Rule | null> {
    return this.ruleModel.findOne({ id }).exec();
  }

  async deleteAll(): Promise<{ deletedCount: number }> {
    const result = await this.ruleModel.deleteMany({}).exec();
    return { deletedCount: result.deletedCount };
  }
}
