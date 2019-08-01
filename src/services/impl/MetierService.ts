import { Service } from "@express.ts/stereotype";
import IMetierService from "../IMetierService";

@Service()
export default class MetierService implements IMetierService {

  getTemperature (): number {
    return Date.now();
  }

}
