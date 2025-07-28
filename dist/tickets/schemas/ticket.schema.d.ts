import { Document, Types } from "mongoose";
export type TicketDocument = Ticket & Document;
export declare class Ticket {
    id: Types.ObjectId;
    ruleId: Types.ObjectId;
    actionId: string;
    userId: string;
    parentTicketId: string;
    status: "pending" | "completed" | "cancelled";
    responseType: string;
    responseTime: Date;
    dueDate: Date;
    responseBy: string;
    comments: string[];
    title: string;
    type: string;
    severity: string;
    content: string;
}
export declare const TicketSchema: import("mongoose").Schema<Ticket, import("mongoose").Model<Ticket, any, any, any, Document<unknown, any, Ticket, any> & Ticket & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Ticket, Document<unknown, {}, import("mongoose").FlatRecord<Ticket>, {}> & import("mongoose").FlatRecord<Ticket> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
