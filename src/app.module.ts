/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ActionsModule } from "./actions/actions.module";
import { TicketsModule } from './tickets/tickets.module';
import { RulesModule } from './rules/rules.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://abdelhafizeltaher98:2cnbIrzeNA22vRWe@cluster0.4corqcq.mongodb.net/"),
    ActionsModule,
    TicketsModule,
    RulesModule,
    EmailModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
