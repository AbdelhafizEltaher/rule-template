import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Rule, RuleSchema } from './schemas/rule.schema';
import { RulesService } from './rules.service';
import { RulesController } from './rules.controller';
import { ActionsModule } from '../actions/actions.module';
import { TicketsModule } from '../tickets/tickets.module'; // Add this import

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rule.name, schema: RuleSchema }]),
    ActionsModule,
    TicketsModule, // Add this import
  ],
  controllers: [RulesController],
  providers: [RulesService],
  exports: [RulesService],
})
export class RulesModule {}