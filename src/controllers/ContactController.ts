import IMailService from "../services/IMailService";
import { RequestMapping, RequestMethod } from "@express.ts/router";
import { Autowired, Request, Response, Controller } from "@express.ts/stereotype";

@Controller()
export default class ContactController {

  @Autowired()
  protected mailService: IMailService;

  /**
   * GET /contact
   * Contact form page.
   */
  @RequestMapping("/contact", RequestMethod.GET)
  getContact (@Request() req: any,
              @Response() res: any) {
    res.render("contact", {
      title: "Contact",
    });
  }

  /**
   * POST /contact
   * Send a contact form via Nodemailer.
   */
  @RequestMapping("/contact", RequestMethod.POST)
  postContact (req: any, res: any) {
    req.assert("name", "Name cannot be blank").notEmpty();
    req.assert("email", "Email is not valid").isEmail();
    req.assert("message", "Message cannot be blank").notEmpty();

    const errors = req.validationErrors();

    if (errors) {
      req.flash("errors", errors);
      return res.redirect("/contact");
    }

    this.mailService.sendMail( {
      to: "your@email.com",
      from: `${req.body.name} <${req.body.email}>`,
      subject: "Contact Form",
      text: req.body.message,
    }).then(({err}) => {
      req.flash.apply(req, (
        !!err
          ? ["errors", { msg: err.message }]
          : ["success", { msg: "Email has been sent successfully!" }]
      ));
      res.redirect("/contact");
    });
  }
}
