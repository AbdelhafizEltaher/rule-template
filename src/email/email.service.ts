// src/email/email.service.ts
import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { TemplateService } from "./template.service";

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly templateService: TemplateService) {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendReviewNotification(
    email: string,
    data: {
      firstName: string;
      dueDate: string;
      reviewLink: string;
      title: string;
      status: string;
      severity: string;
      content: string;
    },
  ): Promise<void> {
    const { html, text } = this.templateService.getReviewNotificationTemplate({
      ...data,
      senderName: process.env.EMAIL_SENDER_NAME || "Support Team",
      companyName: process.env.COMPANY_NAME || "Our Company",
      currentYear: new Date().getFullYear(),
      userEmail: email,
      content: data.content,
      severity: data.severity,
      status: data.status,
      title: data.title,
      type: "Notification Email",
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
    } catch (error) {
      console.error("Error sending review notification:", error);
      throw new Error("Failed to send review notification");
    }
  }
}
