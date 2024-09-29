import { Card } from "./Card";

/** fiche de statistique après le calcul d'un table */
export type statsForm = {
  /** nombre de joueurs ayant le max */
  winnerNb: number;
  /** valeur maximumm des joueurs */
  max: number;
  /** nombre de points assignés à chaque player */
  scores: { [key: string]: number };
};

export type statsCallback = {
  /** différents joueurs impliqué et leur statistique de condition et outs respectif*/
  players: { [key: string]: { stat: number; outs: Card[] } };
  /** résultat concernant la victoire partagé */
  split: winSplit;
  /** données secondaires */
  secondary: secondaryData;
};

export type secondaryData = {
  /** nombre de combinaison totale calculée */
  combinations: number;
  /** temps de calcul en millisecondes */
  computationTime: number;
};
export type winSplit = {
  /** nombre de combinaison amenant au partage d'au moins 2 joueurs */
  winSplit: number;
  /** outs amenant à un partage entre au moins 2 joueurs */
  winSplitOuts: Card[];
};
