import { Model } from "mongoose";
import { Action, ActionDocument } from "./schemas/action.schema";
export declare class ActionsService {
    private actionModel;
    constructor(actionModel: Model<ActionDocument>);
    create(action: Action): Promise<Action>;
    findAll(): Promise<Action[]>;
    findOne(id: string): Promise<Action | null>;
    deleteAll(): Promise<{
        deletedCount: number;
    }>;
    createMany(actions: Action[]): Promise<Action[]>;
    findByRuleId(ruleId: string): Promise<Action[]>;
}
