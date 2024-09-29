import { Card } from "../bases/Card";
import {
  Combination,
  combinationCalculator,
  combinationFactor,
  factor,
} from "./Combination";

export default class HighCard implements combinationCalculator {
  respect(n: number): boolean {
    return Math.trunc(n / combinationFactor) === 0;
  }

  /**
   * calcul de la valeur de la combinaison de carte haute
   * prérequis :
   * - il y a 7 cartes pile
   * - les cartes doivent être classé par valeur décroissante
   * - aucune combinaison n'est présente
   * @param param0 les 7 cartes formant la combinaison
   * @return le score
   * */
  calcul([fi, s, t, fo, fifth]: Card[]): number {
    return (
      fi.value * factor[4] +
      s.value * factor[3] +
      t.value * factor[2] +
      fo.value * factor[1] +
      fifth.value
    );
  }

  /**
   * calcul de la valeur de la combinaison de carte haute pour les outs
   * prérequis :
   * - les cartes doivent être classé par valeur décroissante
   * - aucune combinaison n'est présente
   * @param param0 les cartes formant la combinaison
   * @return le score
   * */
  calculFO([fi, s, t, fo, fifth]: Card[]): number {
    return (
      (fi?.value ?? 0) * factor[4] +
      (s?.value ?? 0) * factor[3] +
      (t?.value ?? 0) * factor[2] +
      (fo?.value ?? 0) * factor[1] +
      (fifth?.value ?? 0)
    );
  }
}
