import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Document } from "mongoose";

export type ActionDocument = Action & Document;

@Schema({ timestamps: true, _id: true })
export class Action {
  @Prop({
    type: Types.ObjectId,
    required: true,
    default: () => new Types.ObjectId(),
  })
  id: Types.ObjectId;

  @Prop({ required: false })
  parentActionId?: string; // For nested actions

  @Prop()
  responseType?: "YES" | "NO" | "NOT_SURE" | "NO_RESPONSE"; // The response type that leads to this action (e.g., 'YES', 'NO')

  @Prop({ required: true })
  type: "VERIFICATION" | "NOTIFICATION" | "ESCALATION"; // Type of action

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  style: string;

  @Prop({ type: [String], required: true })
  usersIds: string[];

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  severity: string;

  @Prop({ required: true })
  assigningMethod: string;

  @Prop()
  notificationType: string;

  @Prop({ required: true, default: false })
  acknowledge: boolean;

  @Prop({ type: Array, default: [] })
  specialFields: any[];

  @Prop({ type: Object, default: {} })
  responses: Record<string, Action[]>;

  @Prop({ required: true })
  notSureEnabled: boolean;

  @Prop({ required: true })
  noResponseEnabled: boolean;
}

export const ActionSchema = SchemaFactory.createForClass(Action);
