import { Card } from "../bases/Card";
import { PlayerProcess } from "../bases/PlayerProcess";
import { ComputePrompt } from "../bases/Response";
import { statsForm, winSplit } from "../bases/types";
import FormatAndMath from "../calculs/FormatAndMath";

export class Calculation2 {
  /** paramètres fourni par le front */
  players: PlayerProcess[] = [];
  /** carte sur la table */
  table: Card[] = [];
  /** cartes non jouées (ne pouvant pas arriver sur table) */
  trash: Card[] = [];

  /** variables back */
  //#region variable de pré-processus
  freeCards: { [key: string]: Card } = {};
  /** nombre de boucle de récursions qui seront nécéssaires */
  loops!: number;
  //#endregion
  //#region variables à renvoyer par l'api
  /** nombre de combinaison qui vont être calculées */
  combinations!: number;
  /** variables concernant la victoire partagée */
  split: winSplit = {
    winSplit: 0,
    winSplitOuts: [],
  };
  /** temps auquel on recoit les données et les calculs vont commencer */
  time!: Date;
  //#endregion

  constructor({ players, table, trash }: ComputePrompt) {
    this.table = table;
    this.players = players.map((v) => new PlayerProcess(v, table));
    this.trash = trash;
    this.time = new Date();
  }

  /** calcul des variables devant être calculé avant le gros processus de recursion */
  preProcess(): void {
    this.freeCards = this.getFreeCards();
    this.loops = this.getLoopsNb();
    this.combinations = FormatAndMath.getCombinationToCalc(
      Object.values(this.freeCards).length,
      this.loops
    );
  }

  /**
   * calcul de toutes les cartes disponibles dans la pioche
   * @returns la liste des cartes disponible
   */
  getFreeCards(): { [key: string]: Card } {
    const set = Card.getSet();
    for (let p of this.players) {
      delete set[p.card1.unique];
      delete set[p.card2.unique];
    }
    for (let c of this.table) {
      delete set[c.unique];
    }
    for (let t of this.trash) {
      delete set[t.unique];
    }
    return set;
  }

  /** nombre de loop de récursion nécéssaire pour calculer toutes les tables possibles */
  getLoopsNb(): number {
    return 5 - this.table?.length ?? 0;
  }

  //#region process de calcul des probabilités
  /** lancement du processus de récursion */
  process(): void {
    if (this.loops === 0) {
      const form = this.score([]);
      this.shareResult(form);
      return;
    }
    this.setOuts();
    this.loop(this.loops, [], Object.values(this.freeCards));
  }

  /**
   * boucles de récursivité se lassant tant que 7 cartes n'ont pas été calculées
   * @param rec nombre de boucle de récursivité à lancer (5max)
   * @param cards cartes deja posées par les boucles précédentes
   */
  loop(rec: number, table: Card[], freeCards: Card[]): void {
    if (rec === 0) {
      const form = this.score(table);
      this.shareResult(form);
      return;
    }
    while (freeCards.length >= rec) {
      let testCard = freeCards[0];
      freeCards = freeCards.splice(1);
      this.loop(rec - 1, [...table, testCard], freeCards.slice());
    }
  }

  /**
   * créé et renvoit le formulaire de score
   * @param table cartes variables qui ont été tirées
   * @returns le formulaire
   */
  score(table: Card[]): statsForm {
    const form: statsForm = { max: 0, scores: {}, winnerNb: 0 };
    this.players.forEach((v) => {
      form.scores[v.id] = v.score(table);
      if (form.max < form.scores[v.id]) {
        form.max = form.scores[v.id];
        /** processus de split */
        form.winnerNb = 1;
        return;
      }
      /** processus de split */
      if (form.max === form.scores[v.id]) form.winnerNb++;
    });
    return form;
  }

  /**
   * écriture des résultats post-calcul
   * @param form le formulaire de résultat après le calcul d'un table
   */
  shareResult(form: statsForm): void {
    this.players.forEach((v: PlayerProcess) => {
      v.conditionRespect += v.checkCondition?.(form) ? 1 : 0;
    });
    if (form.winnerNb > 1) this.split.winSplit++;
  }
  //#endregion
  //#region calcul des outs
  /** mise en place des outs joueurs et partage, sur une boucle avec toutes les freeCards mais sans récursivité */
  setOuts(): void {
    const firstForm = this.scoreForOuts([]);
    Object.values(this.freeCards).forEach((card) => {
      const form = this.scoreForOuts([card]);
      this.players.forEach((v: PlayerProcess) => {
        if (v.checkConditionForOut?.(firstForm, form)) v.outs.push(card);
      });
      if (form.winnerNb > 1) this.split.winSplitOuts.push(card);
    });
  }

  /**
   * créé et renvoit le formulaire de score
   * @param table cartes variables qui ont été tirées
   * @returns le formulaire
   */
  scoreForOuts(table: Card[]): statsForm {
    const form: statsForm = { max: 0, scores: {}, winnerNb: 0 };
    this.players.forEach((v) => {
      form.scores[v.id] = v.scoreForOuts(table);
      if (form.max < form.scores[v.id]) {
        form.max = form.scores[v.id];
        /** processus de split */
        form.winnerNb = 1;
        return;
      }
      /** processus de split */
      if (form.max === form.scores[v.id]) form.winnerNb++;
    });
    return form;
  }
  //#endregion
}
