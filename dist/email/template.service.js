"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateService = void 0;
const common_1 = require("@nestjs/common");
let TemplateService = class TemplateService {
    getReviewNotificationTemplate(data) {
        const getSeverityColor = (severity) => {
            switch (severity) {
                case "Critical":
                    return "#D32F2F";
                case "Major":
                    return "#E65100";
                case "Minor":
                    return "#F57C00";
                default:
                    return "#546E7A";
            }
        };
        const severityColor = getSeverityColor(data.severity);
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Notification: ${data.title}</title>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <style type="text/css">
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; font-family: 'Inter', Arial, sans-serif; }
        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f7f6;">
    <!--[if (gte mso 9)|(IE)]>
    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
    <tr>
    <td align="center" valign="top" width="600">
    <![endif]-->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto;">
        <!-- Header -->
        <tr>
            <td align="center" style="padding: 30px 20px; background-color: #ffffff; border-bottom: 1px solid #e0e0e0;">
                <h1 style="font-size: 24px; font-weight: 700; color: #1a2329; margin: 0;">Remote Sensing</h1>
            </td>
        </tr>
        
        <!-- Main Content Body -->
        <tr>
            <td bgcolor="#ffffff" style="padding: 40px 30px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <!-- Salutation -->
                    <tr>
                        <td style="padding-bottom: 20px;">
                            <p style="margin: 0; font-size: 18px; font-weight: 600; color: #1a2329;">Hello ${data.firstName},</p>
                        </td>
                    </tr>
                    
                    <!-- Introduction Text -->
                    <tr>
                        <td style="padding-bottom: 25px;">
                            <p style="margin: 0; font-size: 16px; color: #525252; line-height: 1.6;">
                                This is a notification regarding a ticket that requires your attention. Please see the details below.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Ticket Details Card -->
                    <tr>
                        <td style="padding-bottom: 25px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8f9fa; border: 1px solid #e2e8f0; border-radius: 12px;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <!-- Title -->
                                        <p style="margin: 0 0 20px 0; font-size: 20px; font-weight: 700; color: #1a2329;">${data.title}</p>
                                        
                                        <!-- Details Grid -->
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td style="padding: 8px 0; color: #718096; font-size: 14px; width: 100px;">Status:</td>
                                                <td style="padding: 8px 0; font-size: 14px; font-weight: 600;">
                                                    <span style="background-color: #e0e0e0; color: #333; padding: 4px 10px; border-radius: 16px; font-size: 12px;">${data.status}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #718096; font-size: 14px;">Type:</td>
                                                <td style="padding: 8px 0; color: #1a2329; font-size: 14px; font-weight: 500;">${data.type}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #718096; font-size: 14px;">Severity:</td>
                                                <td style="padding: 8px 0; font-size: 14px; font-weight: 600;">
                                                    <span style="color:${severityColor};">${data.severity}</span>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <!-- Content/Description Section -->
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
                                            <tr>
                                                <td>
                                                    <p style="margin: 0; font-size: 14px; color: #525252; line-height: 1.6;">${data.content}</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Call to Action Button -->
                    <tr>
                        <td align="center" style="padding: 10px 0;">
                            <!--[if mso]>
                            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${data.reviewLink}" style="height:48px;v-text-anchor:middle;width:250px;" arcsize="50%" strokecolor="#00A99D" fillcolor="#00A99D">
                                <w:anchorlock/>
                                <center style="color:#ffffff;font-family:'Inter',sans-serif;font-size:16px;font-weight:600;">
                                    View Ticket Details
                                </center>
                            </v:roundrect>
                            <![endif]-->
                            <a href="${data.reviewLink}" target="_blank" style="background-color:#00A99D; border-radius:24px; color:#ffffff; display:inline-block; font-family:'Inter',sans-serif; font-size:16px; font-weight:600; line-height:48px; text-align:center; text-decoration:none; width:250px; -webkit-text-size-adjust:none; mso-hide:all;">
                                View Ticket Details
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Footer -->
        <tr>
            <td bgcolor="#e2e8f0" style="padding: 30px; text-align: center;">
                <p style="margin: 0 0 10px 0; font-size: 12px; color: #718096;">
                    You are receiving this email because of an activity in the Remote Sensing platform.
                </p>
                <p style="margin: 0; font-size: 12px; color: #718096;">
                    © ${data.currentYear} ${data.companyName}. All rights reserved.
                </p>
                <p style="margin: 10px 0 0 0; font-size: 12px;">
                    <a href="[Unsubscribe URL]" style="color: #718096; text-decoration: underline;">Manage Notifications</a>
                </p>
            </td>
        </tr>
    </table>
    <!--[if (gte mso 9)|(IE)]>
    </td>
    </tr>
    </table>
    <![endif]-->
</body>
</html>`;
        const text = `
New Notification from Remote Sensing

Hello ${data.firstName},

This is a notification regarding a ticket that requires your attention.

Ticket Title: ${data.title}
--------------------------------------------------
- Status: ${data.status}
- Type: ${data.type}
- Severity: ${data.severity}
--------------------------------------------------

Details:
${data.content}

Please view the full details by visiting the following link:
${data.reviewLink}

Thank you,
The ${data.companyName} Team

---
© ${data.currentYear} ${data.companyName}. All rights reserved.
This is an automated notification. To manage your notification preferences, please visit [Settings URL].
    `;
        return { html, text };
    }
};
exports.TemplateService = TemplateService;
exports.TemplateService = TemplateService = __decorate([
    (0, common_1.Injectable)()
], TemplateService);
//# sourceMappingURL=template.service.js.map