import { TicketsService } from "./tickets.service";
import { EmailService } from "src/email/email.service";
export declare class TicketsController {
    private readonly ticketsService;
    private emailService;
    constructor(ticketsService: TicketsService, emailService: EmailService);
    findAll(): Promise<import("./schemas/ticket.schema").Ticket[]>;
    requestReview(body: {
        email: string;
        firstName: string;
        documentName: string;
        referenceNumber: string;
        dueDate: string;
        reviewLink: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    findOne(id: string): Promise<import("./schemas/ticket.schema").Ticket | null>;
    findByActionId(actionId: string): Promise<import("./schemas/ticket.schema").Ticket[]>;
    findByUserId(userId: string): Promise<import("./schemas/ticket.schema").Ticket[]>;
    deleteAll(): Promise<{
        deletedCount: number;
    }>;
    getTicketChain(ticketId: string): Promise<import("./schemas/ticket.schema").Ticket[]>;
    createInitialTickets(ruleId: string): Promise<import("./schemas/ticket.schema").Ticket[]>;
    createChildTickets(ticketId: string, responseType: "YES" | "NO" | "NOT_SURE", responseBy: string): Promise<{
        currentTicket: import("./schemas/ticket.schema").Ticket;
        childTickets: import("./schemas/ticket.schema").Ticket[];
    }>;
    getMyActiveTickets(userId: string): Promise<import("./schemas/ticket.schema").Ticket[]>;
    getStatusSummary(): Promise<{
        total: number;
        statuses: {
            status: string;
            count: number;
        }[];
    }>;
}
