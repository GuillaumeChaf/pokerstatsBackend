import { Card } from "../bases/Card";

export class Helpers {
  /**
   * tri les cartes en paramètres par ordre de valeur au format décroissant
   * @param cards les cartes à trié
   * @return les cartes triées sous forme de tableau
   */
  static sortByValue(cards: Card[]): Card[] {
    const res = cards.slice();
    return res.sort((a, b) => b.value - a.value);
  }

  /**
   * tri les cartes en paramètre par couleur
   * @param cards les cartes à trié
   * @return les cartes triées sous forme de tableau
   */
  static sortByFlush(cards: Card[]): Card[] {
    const res = cards.slice();
    return res.sort((a, b) => b.symbol - a.symbol);
  }

  /**
   * renvoit la valeur de la paire la plus haute, undefined s'il n'existe pas de paire
   * prérequis :
   * - les cartes sont classé par ordre de valeur décroissante
   * - il y en a 7 pile sans doublons
   * @param cards les cartes à analyser
   * @return la valeur de la paire la plus haute, undefined s'il n'existe pas de paire
   */
  static valuePair(cards: Card[]): number | undefined {
    let i = 0;
    while (i <= 5) {
      if (cards[i].value === cards[i + 1].value) {
        if (cards[i].value !== cards[i + 2]?.value) {
          return cards[i].value;
        } else i = i + 2;
      }
      i++;
    }
    return undefined;
  }

  /**
   * renvoit le nombre de carte maximum dont la valeur est égale (3 s'il y a un brelan mais pas de carré)
   * prérequis :
   * - les cartes sont classés par ordre de valeur
   * - il y en a 7 pile sans doublons
   * @param cards les cartes à analyser
   * @return le nombre max (entre 1 et 4)
   */
  static maxSame(cards: Card[]): number {
    let max = 1;
    let serie = 1;
    let i = 1;
    while (i <= 6) {
      if (cards[i].value === cards[i - 1].value) {
        serie++;
        if (serie > max) max = serie;
      } else {
        serie = 1;
      }
      i++;
    }
    return max;
  }

  /**
   * renvoit le nombre de carte maximum qui ont la même couleur
   * prérequis :
   *  - les cartes sont classé par couleur
   *  - il y en a 7 pile sans doublons
   * @param cards les cartes à analyser
   * @return le nombre max
   */
  static maxFlush(cards: Card[]): number {
    let max = 1;
    let serie = 1;
    let i = 1;
    while (i <= 6) {
      if (cards[i].symbol === cards[i - 1].symbol) {
        serie++;
        if (serie > max) max = serie;
      } else {
        serie = 1;
      }
      i++;
    }
    return max;
  }

  //#region fonction pour le calcul d'outs

  /**
   * renvoit le nombre de carte maximum qui ont la même couleur
   * prérequis :
   *  - les cartes sont classé par couleur
   *  - il y en a 7 pile sans doublons
   * @param cards les cartes à analyser
   * @return le nombre max
   */
  static maxFlushFO(cards: Card[]): number {
    let max = 1;
    let serie = 1;
    let i = 1;
    while (i < cards.length) {
      if (cards[i].symbol === cards[i - 1].symbol) {
        serie++;
        if (serie > max) max = serie;
      } else {
        serie = 1;
      }
      i++;
    }
    return max;
  }

  /**
   * renvoit le nombre de carte maximum dont la valeur est égale (3 s'il y a un brelan mais pas de carré)
   * prérequis :
   * - les cartes sont classés par ordre de valeur
   * - il y en a 7 pile sans doublons
   * @param cards les cartes à analyser
   * @return le nombre max (entre 1 et 4)
   */
  static maxSameFO(cards: Card[]): number {
    let max = 1;
    let serie = 1;
    let i = 1;
    while (i < cards.length) {
      if (cards[i].value === cards[i - 1].value) {
        serie++;
        if (serie > max) max = serie;
      } else {
        serie = 1;
      }
      i++;
    }
    return max;
  }

  /**
   * renvoit la valeur de la paire la plus haute, undefined s'il n'existe pas de paire
   * prérequis :
   * - les cartes sont classé par ordre de valeur décroissante
   * - il y en a 7 pile sans doublons
   * @param cards les cartes à analyser
   * @return la valeur de la paire la plus haute, undefined s'il n'existe pas de paire
   */
  static valuePairFO(cards: Card[]): number | undefined {
    let i = 0;
    while (i < cards.length) {
      if (cards[i].value === cards[i + 1]?.value) {
        if (cards[i].value !== cards[i + 2]?.value) {
          return cards[i].value;
        } else i = i + 2;
      }
      i++;
    }
    return undefined;
  }
  //#endregion
}
