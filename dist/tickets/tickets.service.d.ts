import { Model, Types } from "mongoose";
import { Ticket, TicketDocument } from "./schemas/ticket.schema";
import { RuleDocument } from "../rules/schemas/rule.schema";
import { EmailService } from "src/email/email.service";
export declare class TicketsService {
    private ticketModel;
    private ruleModel;
    private readonly emailService;
    private roundRobinIndices;
    constructor(ticketModel: Model<TicketDocument>, ruleModel: Model<RuleDocument>, emailService: EmailService);
    createInitialTickets(ruleId: Types.ObjectId): Promise<Ticket[]>;
    private createTicketFromAction;
    processResponse(ticketId: string, responseType: "YES" | "NO" | "NOT_SURE", responseBy: string, comments?: string[]): Promise<{
        currentTicket: Ticket;
        childTickets: Ticket[];
    }>;
    getTicketChain(ticketId: string): Promise<Ticket[]>;
    findAll(): Promise<Ticket[]>;
    findOne(id: string): Promise<Ticket | null>;
    findByActionId(actionId: string): Promise<Ticket[]>;
    findByUserId(userId: string): Promise<Ticket[]>;
    deleteAll(): Promise<{
        deletedCount: number;
    }>;
    getMyActiveTickets(userId: string): Promise<Ticket[]>;
    getTicketsStatusSummary(): Promise<{
        total: number;
        statuses: {
            status: string;
            count: number;
        }[];
    }>;
}
