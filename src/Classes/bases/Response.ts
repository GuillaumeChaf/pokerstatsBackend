import { Card } from "./Card";
import { Player } from "./Player";

export class ComputePrompt {
  /** liste des joueurs pour lesquels procéder au calcul */
  players: Player[];
  /** liste des cartes sur table */
  table: Card[];
  /** liste des cartes utilisés par d'autres joueurs */
  trash: Card[];
  constructor({ players, table, trash }: ComputePrompt) {
    this.players = players.map((v) => new Player(v));
    this.table = table?.map((v) => new Card(v)) ?? [];
    this.trash = trash?.map((v) => new Card(v)) ?? [];
  }
}
