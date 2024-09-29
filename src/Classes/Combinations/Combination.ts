import { Card } from "../bases/Card";
import Default from "./Default";
import Flush from "./Flush";
import FourOfAKind from "./FourOfAKind";
import FullHouse from "./Full";
import HighCard from "./HighCard";
import Pair from "./Pair";
import Quint from "./Quint";
import QuintFlush from "./QuintFlush";
import QuintFlushRoyal from "./QuintFlushRoyal";
import ThreeOfAKind from "./ThreeOfAKind";
import TwoPair from "./TwoPair";

export interface combinationCalculator {
  /** est ce que le nombre en paramètre respecte combinaison */
  respect(n: number): boolean;
  /** calcul si la combinaison existe dans la main et si oui, combien elle vaut */
  calcul(cards: Card[], ...args: any[]): number;
  /** calcul si la combinaison existe dans la main et si oui, combien elle vaut, contrairement à calcul,
   * cette fonction accepte un nombre indéterminé de carte mais du coup est moins optimisé */
  calculFO(cards: Card[], ...args: any[]): number;
}

// Définir la factory pour créer des instances de Person
export class CombFactory {
  private combInstances: Map<Combination, combinationCalculator> = new Map([
    [Combination.Default, new Default()],
    [Combination.HighCard, new HighCard()],
    [Combination.Pair, new Pair()],
    [Combination.TwoPair, new TwoPair()],
    [Combination.Three_Of_A_Kind, new ThreeOfAKind()],
    [Combination.Quint, new Quint()],
    [Combination.Flush, new Flush()],
    [Combination.Full, new FullHouse()],
    [Combination.Square, new FourOfAKind()],
    [Combination.Quint_Flush, new QuintFlush()],
    [Combination.Quint_Flush_Royal, new QuintFlushRoyal()],
  ]);

  comb(n: Combination): combinationCalculator {
    return this.combInstances.get(n) as combinationCalculator;
  }

  private static instance: CombFactory;

  static get(): CombFactory {
    if (CombFactory.instance == null) {
      CombFactory.instance = new CombFactory();
    }
    return CombFactory.instance;
  }
}

export enum Combination {
  Default = -1,
  HighCard = 0,
  Pair = 1,
  TwoPair = 2,
  Three_Of_A_Kind = 3,
  Quint = 4,
  Flush = 5,
  Full = 6,
  Square = 7,
  Quint_Flush = 8,
  Quint_Flush_Royal = 9,
}

export const factor: number[] = [1, 100, 10000, 1000000, 100000000];

export const combinationFactor = 10000000000;
