import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type TicketDocument = Ticket & Document;

@Schema({ timestamps: true, _id: true })
export class Ticket {
  @Prop({
    type: Types.ObjectId,
    required: true,
    default: () => new Types.ObjectId(),
  })
  id: Types.ObjectId;
  @Prop({   type: Types.ObjectId,
    required: true, })
  ruleId: Types.ObjectId;

  @Prop({ required: true })
  actionId: string;

  @Prop({ required: true })
  userId: string;

  @Prop()
  parentTicketId: string;

  @Prop({ required: true, default: "pending" })
  status: "pending" | "completed" | "cancelled";

  @Prop()
  responseType: string; // 'YES', 'NO', 'NOT_SURE'

  @Prop()
  responseTime: Date;

  @Prop()
  responseBy: string;

  @Prop({ type: [String], default: [] })
  comments: string[];

  @Prop({ required: true })
  title: string;

  // Additional fields from action
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  severity: string;

  @Prop({ required: true })
  content: string;
}
export const TicketSchema = SchemaFactory.createForClass(Ticket);
