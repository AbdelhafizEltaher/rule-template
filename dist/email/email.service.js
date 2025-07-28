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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const template_service_1 = require("./template.service");
let EmailService = class EmailService {
    templateService;
    transporter;
    constructor(templateService) {
        this.templateService = templateService;
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'abdelhafiz.eltaher.98@gmail.com',
                pass: 'bvymxfsgwflolflp',
            },
        });
    }
    async sendReviewNotification(email, data) {
        const { html, text } = this.templateService.getReviewNotificationTemplate({
            ...data,
            senderName: "Remote Sensing Platform",
            companyName: "Remote Sensing Platform",
            currentYear: new Date().getFullYear(),
            userEmail: email,
            content: data.content,
            severity: data.severity,
            status: data.status,
            title: data.title,
            type: data.type || "Notification",
        });
        const mailOptions = {
            from: `Remote Sensing Platform`,
            to: email,
            subject: `Notification Email`,
            text,
            html,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Review notification sent to ${email}`);
        }
        catch (error) {
            console.error("Error sending review notification:", error);
            throw new Error("Failed to send review notification");
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [template_service_1.TemplateService])
], EmailService);
//# sourceMappingURL=email.service.js.map