import { Card } from "../bases/Card";
import {
  combinationCalculator,
  combinationFactor,
  factor,
} from "./Combination";

export default class ThreeOfAKind implements combinationCalculator {
  respect(n: number): boolean {
    return Math.trunc(n / combinationFactor) === 3;
  }
  /**
   * calcul de la combinaison en paramètre
   * prérequis :
   *  - 7 cartes sont en paramètre,
   *  - les cartes sont classés par ordre de valeur décroissante
   *  - il y a un brelan et pas de paire ni d'autre combinaison (quint, flush)
   * @param cards combinaison de 7 cartes
   * @return le score
   */
  calcul(cards: Card[]): number {
    let tOAK: number = 0;
    let first: number = 0;
    let second: number = 0;
    let i = 0;
    while (!tOAK || !first || !second) {
      if (cards[i]?.value === undefined) {
        let a = 4;
      }
      if (cards[i].value == cards[i + 1].value) {
        tOAK = cards[i].value;
        i = i + 3;
        continue;
      }
      if (!first) {
        first = cards[i].value;
        i++;
        continue;
      }
      if (!second) {
        second = cards[i].value;
        i++;
        continue;
      }
      i++;
    }
    return (
      3 * combinationFactor +
      tOAK * factor[4] +
      first * factor[3] +
      second * factor[2]
    );
  }

  /**
   * calcul de la combinaison en paramètre
   * prérequis :
   *  - il y a entre 3 et 7 cartes
   *  - les cartes sont classés par ordre de valeur décroissante
   *  - il y a un brelan et pas de paire ni d'autre combinaison (quint, flush)
   * @param cards combinaison de 7 cartes
   * @return le score
   */
  calculFO(cards: Card[]): number {
    let tOAK: number = 0;
    let first: number = 0;
    let second: number = 0;
    let i = 0;
    while ((!tOAK || !first || !second) && i < cards.length) {
      if (cards[i].value == cards[i + 1]?.value) {
        tOAK = cards[i].value;
        i = i + 3;
        continue;
      }
      if (!first) {
        first = cards[i].value;
        i++;
        continue;
      }
      if (!second) {
        second = cards[i].value;
        i++;
        continue;
      }
      i++;
    }
    return (
      3 * combinationFactor +
      tOAK * factor[4] +
      first * factor[3] +
      second * factor[2]
    );
  }
}
