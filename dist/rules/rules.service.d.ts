import { Model } from "mongoose";
import { Rule, RuleDocument } from "./schemas/rule.schema";
import { ActionsService } from "../actions/actions.service";
import { Action } from "../actions/schemas/action.schema";
import { TicketsService } from "src/tickets/tickets.service";
export declare class RulesService {
    private ruleModel;
    private actionsService;
    private ticketsService;
    constructor(ruleModel: Model<RuleDocument>, actionsService: ActionsService, ticketsService: TicketsService);
    create(ruleData: Partial<Rule>): Promise<Rule>;
    findActionsByRuleId(ruleId: string): Promise<Action[]>;
    findAll(): Promise<Rule[]>;
    findOne(id: string): Promise<Rule | null>;
    deleteAll(): Promise<{
        deletedCount: number;
    }>;
}
