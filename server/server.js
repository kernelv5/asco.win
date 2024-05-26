// server.js
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MailerSend, EmailParams, Sender, Recipient, Attachment } from 'mailersend';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

app.post('/send-email', async (req, res) => {
    const {  subject, html, attachments } = req.body;

    try {
        const mailerSend = new MailerSend({
            apiKey: process.env.MAILERSEND_API_KEY,
        });

        const to = [
            {
                email: process.env.MAILERSEND_TO_EMAIL,
                name: process.env.MAILERSEND_TO_NAME
            }
        ]

        const emailParams = new EmailParams()
            .setFrom(new Sender(process.env.MAILERSEND_FROM_EMAIL, process.env.MAILERSEND_FROM_NAME))
            .setTo(to.map(recipient => new Recipient(recipient.email, recipient.name)))
            .setSubject(subject)
            .setHtml(html);

        if (attachments && attachments.length > 0) {
            emailParams.setAttachments(
                attachments.map(att => new Attachment(att.content, att.filename))
            );
        }

        const response = await mailerSend.email.send(emailParams);
        res.status(200).json({ message: 'Email sent successfully', response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending email', error });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
