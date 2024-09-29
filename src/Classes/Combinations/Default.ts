import { Card } from "../bases/Card";
import { combinationCalculator } from "./Combination";

export default class Default implements combinationCalculator {
  calcul(vars: Card[]): number {
    return 0;
  }
  respect(n: number): boolean {
    return true;
  }
  calculFO(cards: Card[], maxPair: number): number {
    throw new Error("Method not implemented.");
  }
}
