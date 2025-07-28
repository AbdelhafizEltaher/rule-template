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
exports.TicketsController = void 0;
const common_1 = require("@nestjs/common");
const tickets_service_1 = require("./tickets.service");
const mongoose_1 = require("mongoose");
const email_service_1 = require("../email/email.service");
let TicketsController = class TicketsController {
    ticketsService;
    emailService;
    constructor(ticketsService, emailService) {
        this.ticketsService = ticketsService;
        this.emailService = emailService;
    }
    findAll() {
        return this.ticketsService.findAll();
    }
    async requestReview(body) {
        await this.emailService.sendReviewNotification(body.email, {
            firstName: body.firstName,
            dueDate: body.dueDate,
            reviewLink: body.reviewLink,
            content: `Please review the document "${body.documentName}" by clicking the link below.`,
            title: `Review Request for ${body.documentName}`,
            status: "Pending",
            severity: "Critical",
            type: "Notification Email",
        });
        return {
            success: true,
            message: "Review notification sent successfully",
        };
    }
    findOne(id) {
        return this.ticketsService.findOne(id);
    }
    findByActionId(actionId) {
        return this.ticketsService.findByActionId(actionId);
    }
    findByUserId(userId) {
        return this.ticketsService.findByUserId(userId);
    }
    deleteAll() {
        return this.ticketsService.deleteAll();
    }
    getTicketChain(ticketId) {
        return this.ticketsService.getTicketChain(ticketId);
    }
    createInitialTickets(ruleId) {
        const objectId = new mongoose_1.Types.ObjectId(ruleId);
        return this.ticketsService.createInitialTickets(objectId);
    }
    createChildTickets(ticketId, responseType, responseBy) {
        return this.ticketsService.processResponse(ticketId, responseType, responseBy, [""]);
    }
    async getMyActiveTickets(userId) {
        return this.ticketsService.getMyActiveTickets(userId);
    }
    async getStatusSummary() {
        return this.ticketsService.getTicketsStatusSummary();
    }
};
exports.TicketsController = TicketsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)("email"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "requestReview", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)("action/:actionId"),
    __param(0, (0, common_1.Param)("actionId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "findByActionId", null);
__decorate([
    (0, common_1.Get)("user/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "findByUserId", null);
__decorate([
    (0, common_1.Delete)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "deleteAll", null);
__decorate([
    (0, common_1.Get)("chain/:ticketId"),
    __param(0, (0, common_1.Param)("ticketId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "getTicketChain", null);
__decorate([
    (0, common_1.Get)("create-initial/:ruleId"),
    __param(0, (0, common_1.Param)("ruleId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "createInitialTickets", null);
__decorate([
    (0, common_1.Get)("response/:ticketId/:responseType/:responseBy"),
    __param(0, (0, common_1.Param)("ticketId")),
    __param(1, (0, common_1.Param)("responseType")),
    __param(2, (0, common_1.Param)("responseBy")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "createChildTickets", null);
__decorate([
    (0, common_1.Get)("my-tickets/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "getMyActiveTickets", null);
__decorate([
    (0, common_1.Get)("status-summary"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "getStatusSummary", null);
exports.TicketsController = TicketsController = __decorate([
    (0, common_1.Controller)("tickets"),
    __metadata("design:paramtypes", [tickets_service_1.TicketsService,
        email_service_1.EmailService])
], TicketsController);
//# sourceMappingURL=tickets.controller.js.map