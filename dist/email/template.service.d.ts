export declare class TemplateService {
    getReviewNotificationTemplate(data: {
        firstName: string;
        status: string;
        title: string;
        type: string;
        severity: string;
        content: string;
        reviewLink: string;
        senderName: string;
        companyName: string;
        currentYear: number;
        userEmail: string;
    }): {
        html: string;
        text: string;
    };
}
