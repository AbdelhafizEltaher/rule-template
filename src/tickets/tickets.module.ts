import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './schemas/ticket.schema';
import { Action, ActionSchema } from '../actions/schemas/action.schema';
import { Rule, RuleSchema } from '../rules/schemas/rule.schema';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ticket.name, schema: TicketSchema },
      { name: Action.name, schema: ActionSchema },
      { name: Rule.name, schema: RuleSchema },
    ]),
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService], // Make sure to export the service
})
export class TicketsModule {}