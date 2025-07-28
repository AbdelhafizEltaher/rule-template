/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ActionsModule } from "./actions/actions.module";
import { TicketsModule } from './tickets/tickets.module';
import { RulesModule } from './rules/rules.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://abdelhafizeltaher98:2cnbIrzeNA22vRWe@cluster0.4corqcq.mongodb.net/"),
    ActionsModule,
    TicketsModule,
    RulesModule,
  ],
})
export class AppModule {}
