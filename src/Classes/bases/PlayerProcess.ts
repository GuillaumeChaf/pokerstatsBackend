import { CombFactory, Combination } from "../combinations/Combination";
import { Helpers } from "../combinations/Helpers";
import { Card } from "./Card";
import { Player, condition } from "./Player";
import { statsForm } from "./types";

export class PlayerProcess extends Player {
  /** cartes du joueur actuellement dans le processus de calcul */
  cardsProcess!: Card[];
  /** outs du joueur */
  outs: Card[] = [];
  /** fonction pour remplir la condition */
  checkCondition!: (v: statsForm) => boolean;
  /** fonction pour valider un out */
  checkConditionForOut!: (
    firstForm: statsForm,
    secondForm: statsForm
  ) => boolean;
  /** nombre de fois que la condition a été respecté */
  conditionRespect: number = 0;

  /** fonction relié à la condition de succèes*/
  conditionCallback: { [key in condition]: (v: statsForm) => boolean } = {
    win: this.isWinner,
    lose: this.isLoser,
    finish: (v) => true,
  };

  /** fonction relié à la condition de validation d'out, on inverse loser et winner car pour qu'un out soit validé,
   * la condition devait être non validé avant, si elle est deja validé, le joueur n'a pas d'out disponible */
  conditionForOutCallback: {
    [key in condition]: (
      firstForm: statsForm,
      secondForm: statsForm
    ) => boolean;
  } = {
    win: this.isLoser,
    lose: this.isWinner,
    finish: this.improve,
  };

  constructor(p: Player, table: Card[]) {
    const { card1, card2, condition, suit } = p;
    super(p);
    this.cardsProcess = [card1, card2, ...table];
    this.setCondition();
  }

  /**
   * mise en place de la condition que l'on va lancer à chaque retour de résultat pour vérifier si les résultats respectent les paramètres ou non
   */
  setCondition(): void {
    this.checkCondition = (v: statsForm) =>
      this.conditionCallback[this.condition].bind(this)(v) &&
      CombFactory.get().comb(this.suit).respect(v.scores[this.id]);
    this.checkConditionForOut = (firstForm: statsForm, secondForm: statsForm) =>
      this.checkCondition?.bind(this)(secondForm) &&
      this.conditionForOutCallback[this.condition].bind(this)(
        firstForm,
        secondForm
      );
  }

  //#region condition simple de validation de condition
  /** vérifie que le joueur est gagnant */
  isWinner({ scores, max, winnerNb }: statsForm): boolean {
    return scores[this.id] === max && winnerNb === 1;
  }

  /** vérifie que le joueur est perdant */
  isLoser({ scores: points, max }: statsForm): boolean {
    return points[this.id] !== max;
  }
  //#endregion
  //#region condition de validation d'out
  improve(
    { scores: scoresP }: statsForm,
    { scores: scoresC }: statsForm
  ): boolean {
    return Math.trunc(scoresP[this.id]) < Math.trunc(scoresC[this.id]);
  }
  //#endregion
  /**
   * fonction qui va calculer le score de la combinaison main + table du joueur
   * prérequis :
   *  - les cartes sont au nombre de 7 et sans doublon
   * @param table cartes main + table
   * @returns la valeur de la combinaison
   */
  score(table: Card[]): number {
    let result = 0;
    const cards = [...this.cardsProcess, ...table];
    /** calcul de tous les helpers */
    const sortedV: Card[] = Helpers.sortByValue(cards);
    const sortedF: Card[] = Helpers.sortByFlush(cards);
    const maxFlush: number = Helpers.maxFlush(sortedF);
    const maxSame: number = Helpers.maxSame(sortedV);
    const maxPair: number | undefined =
      maxSame >= 2 ? Helpers.valuePair(sortedV) : undefined;

    /** test de la quint flush */
    if (maxFlush >= 5) {
      result = CombFactory.get().comb(Combination.Quint_Flush).calcul(sortedF);
      if (result > 0) return result;
    }
    /** carré */
    if (maxSame === 4)
      return CombFactory.get().comb(Combination.Square).calcul(sortedV);
    /** full */
    if (maxSame === 3)
      result = CombFactory.get()
        .comb(Combination.Full)
        .calcul(sortedV, maxPair);
    if (result > 0) return result;
    /** flush */
    if (maxFlush >= 5)
      return CombFactory.get().comb(Combination.Flush).calcul(sortedF);
    /** test quint */
    result = CombFactory.get().comb(Combination.Quint).calcul(sortedV);
    if (result > 0) return result;
    /** brelan */
    if (maxSame === 3) {
      return CombFactory.get()
        .comb(Combination.Three_Of_A_Kind)
        .calcul(sortedV);
    }
    /** double paire et paire */
    if (maxPair) {
      result = CombFactory.get()
        .comb(Combination.TwoPair)
        .calcul(sortedV, maxPair);
      return result > 0
        ? result
        : CombFactory.get().comb(Combination.Pair).calcul(sortedV, maxPair);
    }
    return CombFactory.get().comb(Combination.HighCard).calcul(sortedV);
  }

  /**
   * même fonction que score sauf qu'on ne connait pas le nombre de carte, elle comporte donc plus de variable
   * et est plus complexe
   * prérequis :
   *  - les cartes sont entre 0 et 7 et sans doublon
   * @param table cartes
   * @returns la valeur de la combinaison
   */
  scoreForOuts(table: Card[]): number {
    let result = 0;
    const cards = [...this.cardsProcess, ...table];
    /** calcul de tous les helpers */
    const sortedV: Card[] = Helpers.sortByValue(cards);
    const sortedF: Card[] = Helpers.sortByFlush(cards);
    const five: boolean = cards.length >= 5;
    const maxFlush: number = five ? Helpers.maxFlushFO(sortedF) : 0;
    const maxSame: number = Helpers.maxSameFO(sortedV);
    const maxPair: number | undefined =
      maxSame >= 2 ? Helpers.valuePairFO(sortedV) : undefined;

    /** test de la quint flush */
    if (maxFlush >= 5) {
      result = CombFactory.get()
        .comb(Combination.Quint_Flush)
        .calculFO(sortedF);
      if (result > 0) return result;
    }
    /** carré */
    if (maxSame === 4)
      return CombFactory.get().comb(Combination.Square).calculFO(sortedV);
    /** full */
    if (five && maxSame === 3 && maxPair)
      return CombFactory.get()
        .comb(Combination.Full)
        .calculFO(sortedV, maxPair);
    /** flush */
    if (maxFlush >= 5)
      return CombFactory.get().comb(Combination.Flush).calculFO(sortedF);
    /** test quint */
    if (five) {
      result = CombFactory.get().comb(Combination.Quint).calculFO(sortedV);
      if (result > 0) return result;
    }
    /** brelan */
    if (maxSame === 3) {
      return CombFactory.get()
        .comb(Combination.Three_Of_A_Kind)
        .calculFO(sortedV);
    }
    /** double paire et paire */
    if (maxPair) {
      result = CombFactory.get()
        .comb(Combination.TwoPair)
        .calculFO(sortedV, maxPair);
      return result > 0
        ? result
        : CombFactory.get().comb(Combination.Pair).calculFO(sortedV, maxPair);
    }
    return CombFactory.get().comb(Combination.HighCard).calculFO(sortedV);
  }
}
