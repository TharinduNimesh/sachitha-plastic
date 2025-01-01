import nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import { join } from 'path';

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface SendMailOptions {
  to: string;
  subject: string;
  template: string;
  context: Record<string, string>;
}

export async function sendMail({ to, subject, template, context }: SendMailOptions) {
  try {
    // Read template file
    const templatePath = join(process.cwd(), 'public', 'email-templates', `${template}.html`);
    let html = readFileSync(templatePath, 'utf-8');

    // Replace placeholders with context values
    Object.entries(context).forEach(([key, value]) => {
      html = html.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });

    // Send mail
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log('Message sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
