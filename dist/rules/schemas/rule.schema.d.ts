import { Types } from "mongoose";
import { Action } from "src/actions/schemas/action.schema";
export type RuleDocument = Rule & Document;
export declare class Rule {
    id: Types.ObjectId;
    name: string;
    description: string;
    scope: string;
    thenConditions: Action[];
    elseConditions: Action[];
    queryOutput: string;
    conditionType: "EACH" | "ALL";
    attribute: number;
    conditionOperator: "EQUALS" | "NOT_EQUALS" | "GREATER_THAN" | "LESS_THAN" | "CONTAINS";
    operand: string;
    hasBeenResponse: boolean;
}
export declare const RuleSchema: import("mongoose").Schema<Rule, import("mongoose").Model<Rule, any, any, any, import("mongoose").Document<unknown, any, Rule, any> & Rule & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Rule, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Rule>, {}> & import("mongoose").FlatRecord<Rule> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
