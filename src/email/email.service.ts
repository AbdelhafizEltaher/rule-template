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
        user: 'abdelhafiz.eltaher.98@gmail.com',
        pass: 'bvymxfsgwflolflp',
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
      type: string; // Optional field for notification type
    },
  ): Promise<void> {
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
    } catch (error) {
      console.error("Error sending review notification:", error);
      throw new Error("Failed to send review notification");
    }
  }
}
