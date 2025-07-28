import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ActionDocument = Action & Document;

@Schema({ timestamps: true })
export class Action {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  type: string;

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
  responses: Record<string, any[]>;

  @Prop({ required: true })
  notSureEnabled: boolean;

  @Prop({ required: true })
  noResponseEnabled: boolean;
}

export const ActionSchema = SchemaFactory.createForClass(Action);