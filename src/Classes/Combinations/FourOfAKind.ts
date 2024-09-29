import { Card } from "../bases/Card";
import {
  combinationCalculator,
  combinationFactor,
  factor,
} from "./Combination";

export default class FourOfAKind implements combinationCalculator {
  respect(n: number): boolean {
    return Math.trunc(n / combinationFactor) === 7;
  }

  /**
   * calcul de la combinaison en paramètre
   * prérequis :
   *  - 7 cartes sont en paramètre,
   *  - les cartes sont classés par valeur
   *  - il y a au moins 4 cartes de la même valeur
   * @param cards combinaison de 7 cartes
   * @return le score
   *
   * tester le carré avec une paire, avec un brelan à la fin de la combinaison
   */
  calcul(cards: Card[]): number {
    let i = 0;
    let square!: number;
    let first!: number;
    while (i < 5) {
      if (
        cards[i].value === cards[i + 1]?.value &&
        cards[i].value === cards[i + 2]?.value &&
        cards[i].value === cards[i + 3]?.value
      ) {
        square = cards[i].value;
        i = i + 4;
        continue;
      } else if (!first) {
        first = cards[i].value;
      }
      i++;
    }
    return combinationFactor * 7 + square * factor[4] + first * factor[3];
  }
  /**
   * calcul de la combinaison en paramètre
   * prérequis :
   *  - entre 4 et 7 cartes sont en paramètre,
   *  - les cartes sont classés par valeur
   *  - il y a au moins 4 cartes de la même valeur
   * @param cards combinaison de 7 cartes
   * @return le score
   */
  calculFO(cards: Card[]): number {
    let i = 0;
    let square!: number;
    let first: number = 0;
    while (i < 5 && i < cards.length) {
      if (
        cards[i].value === cards[i + 1]?.value &&
        cards[i].value === cards[i + 2]?.value &&
        cards[i].value === cards[i + 3]?.value
      ) {
        square = cards[i].value;
        i = i + 4;
        continue;
      } else if (!first) {
        first = cards[i].value;
      }
      i++;
    }
    return combinationFactor * 7 + square * factor[4] + first * factor[3];
  }
}
