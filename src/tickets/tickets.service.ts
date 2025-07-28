import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Ticket, TicketDocument } from "./schemas/ticket.schema";
import { Action } from "../actions/schemas/action.schema";
import { Rule, RuleDocument } from "../rules/schemas/rule.schema";
import { EmailService } from "src/email/email.service";

@Injectable()
export class TicketsService {
  private roundRobinIndices: Record<string, number> = {};

  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
    @InjectModel(Rule.name) private ruleModel: Model<RuleDocument>,
    private readonly emailService: EmailService,
  ) {}

  async createInitialTickets(ruleId: Types.ObjectId): Promise<Ticket[]> {
    const rule = await this.ruleModel.findOne({ id: ruleId }).exec();
    if (!rule) throw new Error("Rule not found");

    const createdTickets: Ticket[] = [];

    // Validate thenConditions exists and is an array
    if (!rule.thenConditions || !Array.isArray(rule.thenConditions)) {
      throw new Error("Rule has invalid thenConditions");
    }

    for (const condition of rule.thenConditions) {
      // Validate condition has required fields
      if (!condition.id || !condition.usersIds) {
        console.warn("Skipping invalid condition:", condition);
        continue;
      }

      if (rule.conditionType === "ALL") {
        const ticket = await this.createTicketFromAction(
          ruleId,
          condition,
          null,
        );
        if (ticket) {
          createdTickets.push(ticket);
        }
      } else if (rule.conditionType === "EACH") {
        for (let i = 0; i < 10; i++) {
          const ticket = await this.createTicketFromAction(
            ruleId,
            condition,
            null,
          );
          if (ticket) {
            createdTickets.push(ticket);
          }
        }
      }
    }

    return createdTickets;
  }

  private async createTicketFromAction(
    ruleId: Types.ObjectId,
    action: Action,
    parentTicketId: string | null,
  ): Promise<Ticket | null> {
    const users = action.usersIds;
    if (!users || (users.length === 0 && action.type === "VERIFICATION")) {
      throw new Error("No users available for assignment");
    }

    if (action.type === "NOTIFICATION" || action.type === "ESCALATION") {
      await this.emailService.sendReviewNotification(
        "aeltaher@fpconsultancy.com",
        {
          firstName: "Abdelhafiz Ibrahim ALi Eltaher ",
          dueDate: "2025-12-31",
          reviewLink: "http://example.com/review",
          title: "Review Request for Document",
          status: "Pending",
          severity: "Critical",
          content: `Please review the document "${action.title}" by clicking the link below.`,
          type: action.type,
        },
      );
      return null;
    }

    // Get next user in round-robin
    const actionIdStr = action.id.toString();
    const currentIndex = this.roundRobinIndices[actionIdStr] || 0;
    const assignedUserId = users[currentIndex % users.length];
    this.roundRobinIndices[actionIdStr] = (currentIndex + 1) % users.length;

    const ticketData = {
      id: `ticket-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ruleId,
      actionId: action.id,
      userId: assignedUserId,
      parentTicketId,
      status: "pending",
      title: action.title,
      type: action.type,
      severity: action.severity,
      content: action.content,
    };

    const ticket = new this.ticketModel(ticketData);
    return ticket.save();
  }

  async processResponse(
    ticketId: string,
    responseType: "YES" | "NO" | "NOT_SURE",
    responseBy: string,
    comments: string[] = [],
  ): Promise<{ currentTicket: Ticket; childTickets: Ticket[] }> {
    const Ticket = await this.ticketModel.findOne({ id: ticketId }).exec();
    if (!Ticket) throw new Error("Ticket not found");

    if (Ticket.status !== "pending") {
      throw new Error("Ticket is not in pending status");
    }

    if (!["YES", "NO", "NOT_SURE"].includes(responseType)) {
      throw new Error("Invalid response type");
    }

    if (Ticket.userId !== responseBy) {
      throw new Error("Response can only be made by the assigned user");
    }
    const currentTicket = await this.ticketModel
      .findOneAndUpdate(
        { id: ticketId },
        {
          responseType,
          responseBy,
          responseTime: new Date(),
          status: "completed",
          $push: { comments: { $each: comments } },
        },
        { new: true },
      )
      .exec();

    if (!currentTicket) throw new Error("Ticket not found");

    // Get the complete rule document
    const rule = await this.ruleModel
      .findOne({ id: currentTicket.ruleId })
      .exec();
    if (!rule) throw new Error("Rule not found");

    // Find the current action in the rule's thenConditions or elseConditions
    const findActionInConditions = (
      conditions: Action[],
      actionId: string,
    ): Action | null => {
      for (const condition of conditions) {
        if (condition.id.toString() === actionId) {
          return condition;
        }

        // Check nested responses
        if (condition.responses) {
          for (const responseActions of Object.values(condition.responses)) {
            const found = findActionInConditions(responseActions, actionId);
            if (found) return found;
          }
        }
      }
      return null;
    };

    const currentAction = findActionInConditions(
      [...rule.thenConditions, ...rule.elseConditions],
      currentTicket.actionId,
    );

    if (!currentAction) {
      throw new Error("Action not found in rule conditions");
    }

    // Get child actions for this response type
    const childActions = currentAction.responses?.[responseType] || [];
    const childTickets: Ticket[] = [];

    // Create tickets for each child action
    for (const childAction of childActions) {
      const childTicket = await this.createTicketFromAction(
        currentTicket.ruleId,
        childAction,
        currentTicket.id,
      );
      if (childTicket) {
        childTickets.push(childTicket);
      }
    }

    return { currentTicket, childTickets };
  }

  async getTicketChain(ticketId: string): Promise<Ticket[]> {
    const chain: Ticket[] = [];
    let currentId = ticketId;

    while (currentId) {
      const ticket = await this.ticketModel.findOne({ id: currentId }).exec();
      if (!ticket) break;

      chain.unshift(ticket);
      currentId = ticket.parentTicketId;
    }

    return chain;
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketModel.find().exec();
  }

  async findOne(id: string): Promise<Ticket | null> {
    return this.ticketModel.findOne({ id }).exec();
  }

  async findByActionId(actionId: string): Promise<Ticket[]> {
    return this.ticketModel.find({ actionId }).exec();
  }

  async findByUserId(userId: string): Promise<Ticket[]> {
    return this.ticketModel.find({ userId }).exec();
  }

  async deleteAll(): Promise<{ deletedCount: number }> {
    const result = await this.ticketModel.deleteMany({}).exec();
    return { deletedCount: result.deletedCount };
  }

  async getMyActiveTickets(userId: string): Promise<Ticket[]> {
    return this.ticketModel
      .find({
        userId,
        status: "pending",
      })
      .exec();
  }
}
