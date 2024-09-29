import { Card } from "../bases/Card";
import {
  combinationCalculator,
  combinationFactor,
  factor,
} from "./Combination";

export default class Flush implements combinationCalculator {
  respect(n: number): boolean {
    return Math.trunc(n / combinationFactor) === 5;
  }
  /**
   * calcul de la combinaison en paramètre
   * prérequis :
   *  - entre 5 et 7 cartes sont en paramètre sans doublon,
   *  - les cartes sont classés par couleur
   *  - il y a au moins 5 cartes de la même couleur
   * @param cards combinaison de 7 cartes
   * @return le score
   */
  calcul(cards: Card[]): number {
    const fives: number[] = this.isolateBestSymbol(cards)
      .map((v) => v.value)
      .sort((a, b) => b - a)
      .slice(0, 5);
    return this.calculFlush(fives);
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

  /**
   * renvoit les cartes formant la flush sous forme de score
   * prérequis :
   *  - 5 cartes sont en paramètre,
   *  - les 5 cartes sont de la même couleur et sont classés par ordre de valeur décroisant
   * @param values les 5 cartes
   * @returns le score des 5 cartes
   */
  protected calculFlush(
    values: number[],
    combinationValue: number = 5
  ): number {
    return (
      combinationFactor * combinationValue +
      values[0] * factor[4] +
      values[1] * factor[3] +
      values[2] * factor[2] +
      values[3] * factor[1] +
      values[4]
    );
  }
}
