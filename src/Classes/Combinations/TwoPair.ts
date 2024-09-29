import { Card } from "../bases/Card";
import {
  combinationCalculator,
  combinationFactor,
  factor,
} from "./Combination";

export default class TwoPair implements combinationCalculator {
  respect(n: number): boolean {
    return Math.trunc(n / combinationFactor) === 2;
  }

  /**
   * calcul de la combinaison en paramètre
   * prérequis :
   *  - 7 cartes sont en paramètre,
   *  - il y a un moins une paire, aucune autre combinaison, la maxPair est la valeur de la paire la plus haute
   *  - les cartes sont classés par ordre décroissant
   * @param cards combinaison de 7 cartes
   * @param maxPair la valeur de la paire max calculé au préalable
   * @return le score
   */
  calcul(cards: Card[], maxPair: number): number {
    let high: number = 0;
    let secondPair: number = 0;
    let i = 0;
    while (i < 7) {
      if (cards[i].value === maxPair) {
        i = i + 2;
        continue;
      }
      if (cards[i].value === cards[i + 1]?.value && !secondPair) {
        secondPair = cards[i].value;
        i = i + 2;
        continue;
      }
      if (!high) high = cards[i].value;

      if (high && secondPair)
        return (
          combinationFactor * 2 +
          maxPair * factor[4] +
          secondPair * factor[3] +
          high * factor[2]
        );
      i++;
    }
    return secondPair
      ? combinationFactor * 2 +
          maxPair * factor[4] +
          secondPair * factor[3] +
          high * factor[2]
      : 0;
  }

  /**
   * calcul de la combinaison en paramètre
   * prérequis :
   *  - il y a entre 2 et 7 cartes en paramètre sans doublon,
   *  - il y a un moins une paire, aucune autre combinaison, la maxPair est la valeur de la paire la plus haute
   *  - les cartes sont classés par ordre décroissant
   * @param cards combinaison de 7 cartes
   * @param maxPair la valeur de la paire max calculé au préalable
   * @return le score
   */
  calculFO(cards: Card[], maxPair: number): number {
    let high: number = 0;
    let secondPair: number = 0;
    let i = 0;
    while (i < cards.length) {
      if (cards[i].value === maxPair) {
        i = i + 2;
        continue;
      }
      if (cards[i].value === cards[i + 1]?.value && !secondPair) {
        secondPair = cards[i].value;
        i = i + 2;
        continue;
      }
      if (!high) high = cards[i].value;

      if (high && secondPair)
        return (
          combinationFactor * 2 +
          maxPair * factor[4] +
          secondPair * factor[3] +
          high * factor[2]
        );
      i++;
    }
    return secondPair
      ? combinationFactor * 2 +
          maxPair * factor[4] +
          secondPair * factor[3] +
          high * factor[2]
      : 0;
  }
}
