import { Card } from "../bases/Card";
import {
  combinationCalculator,
  combinationFactor,
  factor,
} from "./Combination";

export default class Pair implements combinationCalculator {
  respect(n: number): boolean {
    return Math.trunc(n / combinationFactor) === 1;
  }
  /**
   * calcul de la combinaison en paramètre
   * prérequis :
   *  - 7 cartes sont en paramètre,
   *  - il y a une et une seule paire, aucune autre combinaison, la maxPair est cette unique paire
   *  - les cartes sont classés par ordre décroissant
   * @param cards combinaison de 7 cartes
   * @param maxPair la valeur de la paire max calculé au préalable
   * @return le score
   */
  calcul(cards: Card[], maxPair: number): number {
    let res = combinationFactor;
    res += maxPair * factor[4];
    let i = 0;
    let fact = 3;
    while (fact > 0) {
      if (cards[i].value == maxPair) {
        i = i + 2;
        continue;
      }
      res += cards[i].value * factor[fact];
      fact--;
      i++;
    }
    return res;
  }

  /**
   * calcul de la combinaison en paramètre
   * prérequis :
   *  - il y a une et une seule paire, aucune autre combinaison, la maxPair est cette unique paire
   *  - les cartes sont classés par ordre décroissant
   * @param cards combinaison de cartes
   * @param maxPair la valeur de la paire max calculé au préalable
   * @return le score
   */
  calculFO(cards: Card[], maxPair: number): number {
    let res = combinationFactor + maxPair * factor[4];
    let i = 0;
    let fact = 3;
    while (fact > 0 && i < cards.length) {
      if (cards[i].value == maxPair) {
        i = i + 2;
        continue;
      }
      res += cards[i].value * factor[fact];
      fact--;
      i++;
    }
    return res;
  }
}
