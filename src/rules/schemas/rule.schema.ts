import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Action } from "src/actions/schemas/action.schema";

export type RuleDocument = Rule & Document;

@Schema({ timestamps: true, _id: true })
export class Rule {
  @Prop({
    type: Types.ObjectId,
    required: true,
    default: () => new Types.ObjectId(),
  })
  id: Types.ObjectId;
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ default: "" })
  description: string;

  @Prop({ required: true })
  scope: string;

  @Prop({ type: Array, default: [] })
  thenConditions: Action[];

  @Prop({ type: Array, default: [] })
  elseConditions: Action[];

  @Prop()
  queryOutput: string;

  @Prop({ required: true })
  conditionType: "EACH" | "ALL";

  @Prop({ required: true })
  attribute: number;

  @Prop({ required: true })
  conditionOperator:
    | "EQUALS"
    | "NOT_EQUALS"
    | "GREATER_THAN"
    | "LESS_THAN"
    | "CONTAINS";

  @Prop({ required: true })
  operand: string;

  @Prop()
  hasBeenResponse: boolean;
}

export const RuleSchema = SchemaFactory.createForClass(Rule);
