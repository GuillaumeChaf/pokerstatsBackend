import { Card } from "../bases/Card";
import {
  combinationCalculator,
  combinationFactor,
  factor,
} from "./Combination";

export default class QuintFlush implements combinationCalculator {
  respect(n: number): boolean {
    return Math.trunc(n / combinationFactor) === 8;
  }
  /**
   * calcul de la combinaison de quintflush s'il y en a une
   * prérequis :
   *  - entre 5 et 7 cartes sont en paramètre sans doublon,
   *  - les cartes sont classés par couleur
   *  - il y a au moins 5 cartes de la même couleur
   * @param cards combinaison de 7 cartes
   * @return 0 s'il n'y a pas de quintflush sinon la valeur de la quintflush
   */
  calcul(cards: Card[]): number {
    let fivesPlus: number[] = this.isolateBestSymbol(cards)
      .map((v) => v.value)
      .sort((a, b) => b - a);
    /** cas de la quinte à 5 */
    if (fivesPlus[0] === 14) fivesPlus.push(1);
    const max = fivesPlus.length;
    let i = 1;
    let seq = 1;
    let quint: number = fivesPlus[0];
    while (max - i + seq >= 5) {
      if (fivesPlus[i - 1] === fivesPlus[i] + 1) {
        seq++;
        if (seq === 5) return 8 * combinationFactor + quint * factor[4];
        i++;
        continue;
      }
      quint = fivesPlus[i];
      seq = 1;
      i++;
    }
    return 0;
  }

  calculFO = this.calcul;

  /**
   * à partir d'un pull de carte, isole la première série de carte du même symbole qui a au moins 5 symbole ou plus
   * prérequis :
   *  - 7 cartes sont en paramètre,
   *  - les cartes sont classés par couleur
   *  - il y a au moins 5 cartes de la même couleur
   * @param cards le pull de carte en question
   * @param return la série de carte une fois isolé
   */
  protected isolateBestSymbol(cards: Card[]): Card[] {
    let finals: Card[] = [cards[0]];
    let i = 1;
    const max = cards.length;
    while (i < max) {
      if (cards[i - 1].symbol === cards[i].symbol) {
        finals.push(cards[i]);
      } else {
        if (finals.length >= 5) {
          return finals;
        }
        finals = [cards[i]];
      }
      i++;
    }
    return finals;
  }
}
