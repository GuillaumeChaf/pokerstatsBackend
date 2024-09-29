import { Card } from "../bases/Card";
import {
  combinationCalculator,
  combinationFactor,
  factor,
} from "./Combination";

export default class Quint implements combinationCalculator {
  respect(n: number): boolean {
    return Math.trunc(n / combinationFactor) === 4;
  }
  /**
   * calcul de la combinaison en paramètre
   * prérequis :
   *  - 7 cartes sont en paramètre sans doublons,
   *  - les cartes sont classés par ordre de valeur décroissante
   * @param cards combinaison de 7 cartes
   * @return le score
   */
  calcul(cards: Card[]): number {
    let quint = cards[0].value;
    let i = 1;
    let seq = 1;
    /** cas des suites au 5 */
    if (cards[0].value === 14)
      cards.push(new Card({ value: 1, symbol: 0 } as Card));
    while (cards.length - i + seq >= 5) {
      if (cards[i - 1].value === cards[i].value + 1) {
        seq++;
        if (seq === 5) return 4 * combinationFactor + quint * factor[4];
        i++;
        continue;
      }
      if (cards[i - 1].value === cards[i].value) {
        i++;
        continue;
      }
      quint = cards[i].value;
      seq = 1;
      i++;
    }
    return 0;
  }

  /**
   * calcul de la combinaison en paramètre
   * prérequis :
   *  - entre 5 et 7 cartes sont en paramètre sans doublons,
   *  - les cartes sont classés par ordre de valeur décroissante
   * @param cards combinaison de 7 cartes
   * @return le score
   */
  calculFO = this.calcul;
  //   let quint = cards[0].value;
  //   let i = 1;
  //   let seq = 1;
  //   /** cas des suites au 5 */
  //   if (cards[0].value === 14)
  //     cards.push(new Card({ value: 1, symbol: 0 } as Card));
  //   while (cards.length - i + seq >= 5) {
  //     if (cards[i - 1].value === cards[i].value + 1) {
  //       seq++;
  //       if (seq === 5) return 4 * combinationFactor + quint * factor[4];
  //       i++;
  //       continue;
  //     }
  //     if (cards[i - 1].value === cards[i].value) {
  //       i++;
  //       continue;
  //     }
  //     quint = cards[i].value;
  //     seq = 1;
  //     i++;
  //   }
  //   return 0;
  // }
}
