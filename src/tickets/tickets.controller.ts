import { Controller, Get, Param, Delete } from "@nestjs/common";
import { TicketsService } from "./tickets.service";
import { Types } from "mongoose";

@Controller("tickets")
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.ticketsService.findOne(id);
  }

  @Get("action/:actionId")
  findByActionId(@Param("actionId") actionId: string) {
    return this.ticketsService.findByActionId(actionId);
  }

  @Get("user/:userId")
  findByUserId(@Param("userId") userId: string) {
    return this.ticketsService.findByUserId(userId);
  }

  @Delete()
  deleteAll() {
    return this.ticketsService.deleteAll();
  }
  @Get("chain/:ticketId")
  getTicketChain(@Param("ticketId") ticketId: string) {
    return this.ticketsService.getTicketChain(ticketId);
  }
  @Get("create-initial/:ruleId")
  createInitialTickets(@Param("ruleId") ruleId: string) {
    // Convert ruleId string to Types.ObjectId
    const objectId = new Types.ObjectId(ruleId);
    return this.ticketsService.createInitialTickets(objectId);
  }
  @Get("response/:ticketId/:responseType/:responseBy")
  createChildTickets(
    @Param("ticketId") ticketId: string,
    @Param("responseType") responseType: "YES" | "NO" | "NOT_SURE",
    @Param("responseBy") responseBy: string,
  ) {
    return this.ticketsService.processResponse(
      ticketId,
      responseType,
      responseBy,
      [""],
    );
  }

  @Get("my-tickets/:userId")
  async getMyActiveTickets(@Param("userId") userId: string) {
    return this.ticketsService.getMyActiveTickets(userId);
  }
}
