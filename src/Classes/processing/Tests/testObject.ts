import { Card, Symbol } from "../../bases/Card";
import { Player } from "../../bases/Player";
import { Combination } from "../../combinations/Combination";
import { cardsPull } from "../../combinations/Tests/CardsPull";

const {
  SA,
  DA,
  DK,
  CA,
  SK,
  HA,
  S2,
  D2,
  S4,
  D4,
  C4,
  H4,
  D8,
  S8,
  D9,
  S3,
  D5,
  H2,
} = cardsPull;
export const players = {
  P135H: new Player({
    id: "1",
    card1: new Card({ value: 3, symbol: Symbol.Heart } as Card),
    card2: new Card({ value: 5, symbol: Symbol.Heart } as Card),
    condition: "win",
    suit: Combination.Default,
  } as Player),
  P235S: new Player({
    id: "2",
    card1: new Card({ value: 3, symbol: Symbol.Spade } as Card),
    card2: new Card({ value: 5, symbol: Symbol.Spade } as Card),
    condition: "finish",
    suit: Combination.Pair,
  } as Player),
  P5AK: new Player({
    id: "5",
    card1: DA,
    card2: SK,
  } as Player),
  P422: new Player({
    id: "4",
    card1: S2,
    card2: H2,
  } as Player),
  P5AA: new Player({
    id: "5",
    card1: new Card({ value: 14, symbol: Symbol.Diamond } as Card),
    card2: new Card({ value: 14, symbol: Symbol.Heart } as Card),
  } as Player),
  P6DAK: new Player({
    id: "6",
    card1: DA,
    card2: DK,
  } as Player),
};
