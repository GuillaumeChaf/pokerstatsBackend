import { Card } from "../bases/Card";
import { combinationCalculator, factor } from "./Combination";

export default class QuintFlushRoyal implements combinationCalculator {
  respect(n: number): boolean {
    return Math.trunc(n / factor[4]) === 814;
  }

  /** la fonction n'est censé jamais être appelé car trop proche de la quintflush */
  calcul(cards: Card[], ...args: any[]): number {
    throw new Error("Method not implemented.");
  }

  calculFO(cards: Card[], maxPair: number): number {
    throw new Error("Method not implemented.");
  }
}
