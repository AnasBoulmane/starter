"use strict";

import { RequestMapping, GetMapping, RequestMethod } from "@express.ts/router";
import { Controller, Request, Response } from "@express.ts/stereotype";

// API keys and Passport configuration

@Controller("/api")
export default class ApiController {

  /**
   * GET /api
   * List of API examples.
   */
  @GetMapping("")
  index (@Request() req: any,
         @Response() res: any) {
    res.render("api/index", {
      title: "API Examples",
    });
  }

}
