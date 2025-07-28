"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const ticket_schema_1 = require("./schemas/ticket.schema");
const rule_schema_1 = require("../rules/schemas/rule.schema");
const email_service_1 = require("../email/email.service");
let TicketsService = class TicketsService {
    ticketModel;
    ruleModel;
    emailService;
    roundRobinIndices = {};
    constructor(ticketModel, ruleModel, emailService) {
        this.ticketModel = ticketModel;
        this.ruleModel = ruleModel;
        this.emailService = emailService;
    }
    async createInitialTickets(ruleId) {
        const rule = await this.ruleModel.findOne({ id: ruleId }).exec();
        if (!rule)
            throw new Error("Rule not found");
        const createdTickets = [];
        if (!rule.thenConditions || !Array.isArray(rule.thenConditions)) {
            throw new Error("Rule has invalid thenConditions");
        }
        for (const condition of rule.thenConditions) {
            if (!condition.id || !condition.usersIds) {
                console.warn("Skipping invalid condition:", condition);
                continue;
            }
            if (rule.conditionType === "ALL") {
                const ticket = await this.createTicketFromAction(ruleId, condition, null);
                if (ticket) {
                    createdTickets.push(ticket);
                }
            }
            else if (rule.conditionType === "EACH") {
                for (let i = 0; i < 10; i++) {
                    const ticket = await this.createTicketFromAction(ruleId, condition, null);
                    if (ticket) {
                        createdTickets.push(ticket);
                    }
                }
            }
        }
        return createdTickets;
    }
    async createTicketFromAction(ruleId, action, parentTicketId) {
        const users = action.usersIds;
        if (!users || (users.length === 0 && action.type === "VERIFICATION")) {
            throw new Error("No users available for assignment");
        }
        if (action.type === "NOTIFICATION" || action.type === "ESCALATION") {
            await this.emailService.sendReviewNotification("aeltaher@fpconsultancy.com", {
                firstName: "Abdelhafiz Ibrahim ALi Eltaher ",
                dueDate: "2025-12-31",
                reviewLink: "http://example.com/review",
                title: "Review Request for Document",
                status: "Pending",
                severity: "Critical",
                content: `Please review the document "${action.title}" by clicking the link below.`,
                type: action.type,
            });
            return null;
        }
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
            dueDate: new Date(),
        };
        const ticket = new this.ticketModel(ticketData);
        return ticket.save();
    }
    async processResponse(ticketId, responseType, responseBy, comments = []) {
        const Ticket = await this.ticketModel.findOne({ id: ticketId }).exec();
        if (!Ticket)
            throw new Error("Ticket not found");
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
            .findOneAndUpdate({ id: ticketId }, {
            responseType,
            responseBy,
            responseTime: new Date(),
            status: "completed",
            $push: { comments: { $each: comments } },
        }, { new: true })
            .exec();
        if (!currentTicket)
            throw new Error("Ticket not found");
        const rule = await this.ruleModel
            .findOne({ id: currentTicket.ruleId })
            .exec();
        if (!rule)
            throw new Error("Rule not found");
        const findActionInConditions = (conditions, actionId) => {
            for (const condition of conditions) {
                if (condition.id.toString() === actionId) {
                    return condition;
                }
                if (condition.responses) {
                    for (const responseActions of Object.values(condition.responses)) {
                        const found = findActionInConditions(responseActions, actionId);
                        if (found)
                            return found;
                    }
                }
            }
            return null;
        };
        const currentAction = findActionInConditions([...rule.thenConditions, ...rule.elseConditions], currentTicket.actionId);
        if (!currentAction) {
            throw new Error("Action not found in rule conditions");
        }
        const childActions = currentAction.responses?.[responseType] || [];
        const childTickets = [];
        for (const childAction of childActions) {
            const childTicket = await this.createTicketFromAction(currentTicket.ruleId, childAction, currentTicket.id);
            if (childTicket) {
                childTickets.push(childTicket);
            }
        }
        return { currentTicket, childTickets };
    }
    async getTicketChain(ticketId) {
        const chain = [];
        let currentId = ticketId;
        while (currentId) {
            const ticket = await this.ticketModel.findOne({ id: currentId }).exec();
            if (!ticket)
                break;
            chain.unshift(ticket);
            currentId = ticket.parentTicketId;
        }
        return chain;
    }
    async findAll() {
        return this.ticketModel.find().exec();
    }
    async findOne(id) {
        return this.ticketModel.findOne({ id }).exec();
    }
    async findByActionId(actionId) {
        return this.ticketModel.find({ actionId }).exec();
    }
    async findByUserId(userId) {
        return this.ticketModel.find({ userId }).exec();
    }
    async deleteAll() {
        const result = await this.ticketModel.deleteMany({}).exec();
        return { deletedCount: result.deletedCount };
    }
    async getMyActiveTickets(userId) {
        return this.ticketModel
            .find({
            userId,
            status: "pending",
        })
            .exec();
    }
    async getTicketsStates() {
        try {
            console.log(`Fahd `);
            const totalTickets = await this.ticketModel.countDocuments({});
            console.log(`Total tickets in collection: ${totalTickets}`);
            const sampleDocs = await this.ticketModel
                .find({ status: { $exists: true } })
                .limit(5);
            console.log("Sample documents with status:", sampleDocs);
            const result = await this.ticketModel
                .aggregate([
                {
                    $match: { status: { $exists: true } },
                },
                {
                    $group: {
                        _id: "$status",
                        count: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        status: "$_id",
                        count: 1,
                        _id: 0,
                    },
                },
                {
                    $sort: { count: -1 },
                },
            ])
                .exec();
            console.log("Aggregation result:", result);
            return result.map((item) => ({
                status: String(item.status),
                count: Number(item.count),
            }));
        }
        catch (error) {
            console.error("Error in getTicketsStates:", error);
            throw new Error("Failed to retrieve ticket states");
        }
    }
    async getTicketsStatusSummary() {
        try {
            const total = await this.ticketModel.countDocuments({});
            if (total === 0) {
                return { total: 0, statuses: [] };
            }
            const statusCounts = await this.ticketModel.aggregate([
                {
                    $match: { status: { $exists: true } }
                },
                {
                    $group: {
                        _id: "$status",
                        count: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        status: "$_id",
                        count: 1,
                        _id: 0
                    }
                },
                {
                    $sort: { count: -1 }
                }
            ]);
            const normalizedStatuses = statusCounts.map((item) => ({
                status: String(item.status),
                count: Number(item.count)
            }));
            return {
                total,
                statuses: normalizedStatuses
            };
        }
        catch (error) {
            console.error('Error in getTicketsStatusSummary:', error);
            throw new Error('Failed to retrieve ticket status summary');
        }
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(ticket_schema_1.Ticket.name)),
    __param(1, (0, mongoose_1.InjectModel)(rule_schema_1.Rule.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        email_service_1.EmailService])
], TicketsService);
//# sourceMappingURL=tickets.service.js.map