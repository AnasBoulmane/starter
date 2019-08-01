import { SentMessageInfo } from "nodemailer";
import Mail = require("nodemailer/lib/mailer");

export default interface IMailService {
  sendMail (mailOptions: Mail.Options): Promise<{ err: Error | null, info: SentMessageInfo }>;
}
