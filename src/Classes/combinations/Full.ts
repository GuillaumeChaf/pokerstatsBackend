import { Card } from "../bases/Card";
import {
  combinationCalculator,
  combinationFactor,
  factor,
} from "./Combination";

export default class FullHouse implements combinationCalculator {
  respect(n: number): boolean {
    return Math.trunc(n / combinationFactor) === 6;
  }

  /**
   * calcul de la combinaison en paramètre
   * prérequis :
   *  - 7 cartes sont en paramètre sans doublons,
   *  - les cartes sont classés par ordre de valeur
   *  - il n'y a pas de carré
   *  - il y a un brelan dans la combinaison
   * @param cards liste des 7 cartes par ordre de valeur
   * @param maxPair la valeur de la paire la plus haute, undefined s'il n'y a pas de paire
   */
  calcul(cards: Card[], maxPair: number | undefined): number {
    let three!: number;
    let two = maxPair;
    let i = 0;
    while (i < 5) {
      if (cards[i].value === cards[i + 1]?.value) {
        if (cards[i].value === cards[i + 2]?.value) {
          if (!three) {
            three = cards[i].value;
          } else if (!two) two = cards[i].value;
          i++;
        } else if (!two) {
          two = cards[i].value;
        }
        if (two && three)
          return combinationFactor * 6 + three * factor[4] + two * factor[3];
        i++;
      }
      i++;
    }
    return 0;
  }
  /**
   * calcul de la combinaison en paramètre
   * prérequis :
   *  - il y a entre 5 et 7 cartes en paramètre sans doublon,
   *  - les cartes sont classés par ordre de valeur
   *  - il n'y a pas de carré
   *  - il y a un brelan dans la combinaison
   *  - il y a au moins une paire dont la valeur est égale à maxPair
   * @param cards liste des cartes par ordre de valeur
   * @param maxPair la valeur de la paire la plus haute, undefined s'il n'y a pas de paire
   */
  calculFO = this.calcul;
}
