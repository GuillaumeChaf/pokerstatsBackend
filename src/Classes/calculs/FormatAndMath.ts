export default class FormatAndMath {
  /**
   * calcul la factorielle avec potentiellemment une limite
   * @param tot the number you want the fact
   * @param lim the limit of the fact (exemple : (tot = 6, lim = 4) return 6*5*4)
   * @returns le résultat
   */
  static fact(tot: number, lim: number = 0): number {
    let result = 1;
    while (tot > lim) {
      result *= tot;
      tot--;
    }
    return result;
  }

  /**
   * calcul le nombre de combinaosn/tirage disponible à partir des 2 paramètre
   * @param cardSet nombre de carte encore dans le paquet
   * @param slots nombre de carterestante à tirer
   * @returns le nombre de combinaison
   */
  static getCombinationToCalc(cardSet: number, slots: number): number {
    return this.fact(cardSet, cardSet - slots) / this.fact(slots);
  }
}
