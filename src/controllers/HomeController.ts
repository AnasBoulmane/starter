import { GetMapping, RequestMapping, RequestMethod } from "@express.ts/router";
import { Controller, Request, Response, RequestParam } from "@express.ts/stereotype";
import { Test } from "../models/Test";
import { homePageData } from "../resources/initialdata/HomePageData";
import { secondaryHomePageData } from "../resources/initialdata/SecondaryHomePageData";

@Controller()
export default class HomeController {

  /**
   * GET /
   * Home page.
   */
  // @VueResponse()
  @RequestMapping("/", RequestMethod.GET)
  index (@Request() req: any,
         @Response() res: any,
         @RequestParam("p1", Number) p1: number,
         @RequestParam("p2", Object) p2: any) {
    console.log({
      paramName: "p1",
      type: "Number",
      value: p1,
    });
    console.log({
      paramName: "p2",
      type: "Number",
      value: p2,
    });
    res.send(homePageData);
  }

  @GetMapping("/home")
  secondary (@Request() req: any,
             @Response() res: any,
             @RequestParam("p1", Number) p: number,
             @RequestParam("p2", Number) p2: any) {
    console.log(p);
    res.send(homePageData);
  }

  @GetMapping("/home/data.json")
  secondaryData (
      @Request() req: any,
      @Response() res: any,
      @RequestParam("p1", Number) p: number,
      @RequestParam("p2", Test) p2: any) {
    res.send(secondaryHomePageData);
  }

}
