import { Combination } from "../combinations/Combination";
import { Card } from "./Card";

export class Player {
  /** id du joueur */
  id!: string;
  /** paramètres du joueur acquis via le front */
  card1!: Card;
  card2!: Card;
  condition: condition;
  suit: Combination;

  constructor(v: Player) {
    this.id = v.id;
    this.card1 = new Card(v.card1);
    this.card2 = new Card(v.card2);
    this.condition = v.condition ?? "win";
    this.suit = v.suit ?? Combination.Default;
  }
}

export type condition = "win" | "finish" | "lose";
