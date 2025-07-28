import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { Action } from './schemas/action.schema';

@Controller('actions')
export class ActionsController {
  constructor(private readonly actionsService: ActionsService) {}

  @Post()
  create(@Body() action: Action) {
    return this.actionsService.create(action);
  }

  @Post('bulk')
  createMany(@Body() actions: Action[]) {
    return this.actionsService.createMany(actions);
  }

  @Get()
  findAll() {
    return this.actionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actionsService.findOne(id);
  }

  @Delete()
  deleteAll() {
    return this.actionsService.deleteAll();
  }
}