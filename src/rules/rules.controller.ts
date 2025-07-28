import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RulesService } from './rules.service';
import { Rule } from './schemas/rule.schema';

@Controller('rules')
export class RulesController {
  constructor(private readonly rulesService: RulesService) {}

  @Post()
  create(@Body() rule: Rule) {
    return this.rulesService.create(rule);
  }

  @Get()
  findAll() {
    return this.rulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rulesService.findOne(id);
  }

  @Delete()
  deleteAll() {
    return this.rulesService.deleteAll();
  }
}