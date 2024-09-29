import { Card } from "../Card";
import { Player } from "../Player";
import { PlayerProcess } from "../PlayerProcess";

const p1 = new PlayerProcess(
  new Player({
    id: "6",
    card1: new Card({ symbol: 3, value: 14 } as Card),
    card2: new Card({ symbol: 3, value: 13 } as Card),
  } as Player),
  [
    new Card({ symbol: 3, value: 4 } as Card),
    new Card({ symbol: 3, value: 7 } as Card),
    new Card({ symbol: 0, value: 8 } as Card),
  ]
);

describe("Test de la fonction scoreForOuts", () => {
  test("Apparition d'une couleur", () => {
    expect(p1.scoreForOuts([{ value: 6, symbol: 3 } as Card])).toBe(
      51413070604
    );
  });
});
