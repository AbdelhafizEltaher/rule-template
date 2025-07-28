import { Types } from "mongoose";
import { Document } from "mongoose";
export type ActionDocument = Action & Document;
export declare class Action {
    id: Types.ObjectId;
    parentActionId?: string;
    responseType?: "YES" | "NO" | "NOT_SURE" | "NO_RESPONSE";
    type: "VERIFICATION" | "NOTIFICATION" | "ESCALATION";
    title: string;
    style: string;
    usersIds: string[];
    content: string;
    severity: string;
    assigningMethod: string;
    notificationType: string;
    acknowledge: boolean;
    specialFields: any[];
    responses: Record<string, Action[]>;
    notSureEnabled: boolean;
    noResponseEnabled: boolean;
}
export declare const ActionSchema: import("mongoose").Schema<Action, import("mongoose").Model<Action, any, any, any, Document<unknown, any, Action, any> & Action & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Action, Document<unknown, {}, import("mongoose").FlatRecord<Action>, {}> & import("mongoose").FlatRecord<Action> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
