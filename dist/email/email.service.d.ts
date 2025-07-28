import { TemplateService } from "./template.service";
export declare class EmailService {
    private readonly templateService;
    private transporter;
    constructor(templateService: TemplateService);
    sendReviewNotification(email: string, data: {
        firstName: string;
        dueDate: string;
        reviewLink: string;
        title: string;
        status: string;
        severity: string;
        content: string;
        type: string;
    }): Promise<void>;
}
