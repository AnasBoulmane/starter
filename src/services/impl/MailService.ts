import nodemailer, { SentMessageInfo } from "nodemailer";
import Mail = require("nodemailer/lib/mailer");
import { Service, Value } from "@express.ts/stereotype";
import IMailService from "../IMailService";

@Service()
export default class MailService implements IMailService {

  protected transporter: any;

  @Value("nodemailer.service")
  protected service: string;

  @Value("nodemailer.auth.user")
  protected username: string;

  @Value("nodemailer.auth.pass")
  protected password: string;

  protected $OnInit () {
    this.transporter =  nodemailer.createTransport({
      service: this.service,
      auth: {
        user: this.username,
        pass: this.password,
      },
    });

    console.log("MailService -> $OnInit   : ==========================================> ");
  }

  sendMail (mailOptions: Mail.Options): Promise<{ err: Error | null, info: SentMessageInfo }> {
    return new Promise((resolve) => {
      this.transporter.sendMail(mailOptions,
        (err: Error | null, info: SentMessageInfo) => resolve({ err, info }),
      );
    });
  }
}
