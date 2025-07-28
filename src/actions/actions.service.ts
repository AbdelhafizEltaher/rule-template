import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Action, ActionDocument } from "./schemas/action.schema";

@Injectable()
export class ActionsService {
  constructor(
    @InjectModel(Action.name) private actionModel: Model<ActionDocument>,
  ) {}

  async create(action: Action): Promise<Action> {
    const createdAction = new this.actionModel(action);
    return createdAction.save();
  }

  async findAll(): Promise<Action[]> {
    return this.actionModel.find().exec();
  }

  async findOne(id: string): Promise<Action | null> {
    return this.actionModel.findOne({ id }).exec();
  }

  async deleteAll(): Promise<{ deletedCount: number }> {
    const result = await this.actionModel.deleteMany({}).exec();
    return { deletedCount: result.deletedCount };
  }

  async createMany(actions: Action[]): Promise<Action[]> {
    return this.actionModel.insertMany(actions);
  }

  async findByRuleId(ruleId: string): Promise<Action[]> {
    return this.actionModel.find({ ruleId }).exec();
  }
}
