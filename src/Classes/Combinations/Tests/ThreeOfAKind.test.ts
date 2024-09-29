import ThreeOfAKind from "../ThreeOfAKind";
import { cardsPull } from "./CardsPull";

const classCombination: ThreeOfAKind = new ThreeOfAKind();

describe("Combinaison de brelan", () => {
  describe("Calcul de table", () => {
    test("Petit brelan", () => {
      const { CA, D10, DQ, SJ, C4, D4, S4 } = cardsPull;
      expect(classCombination.calcul([CA, DQ, SJ, D10, C4, D4, S4])).toBe(
        30414120000
      );
    });
    test("Brelan dans la combinaison", () => {
      const { S10, C10, D10, S9, C4, DA, S4 } = cardsPull;
      expect(classCombination.calcul([DA, S10, C10, D10, S9, C4, S4])).toBe(
        31014090000
      );
    });
    test("Gros brelan", () => {
      const { SA, CA, DQ, SJ, C4, DA, S2 } = cardsPull;
      expect(classCombination.calcul([DA, SA, CA, DQ, SJ, C4, S2])).toBe(
        31412110000
      );
    });
  });
  describe("Calcul pour les outs", () => {
    const { SA, CA, DQ, HK, SJ, C4, DA, S2, S10, C10, D10 } = cardsPull;

    test("Brelan seul", () => {
      expect(classCombination.calculFO([DA, SA, CA])).toBe(31400000000);
    });
    test("Brelan top et une carte", () => {
      expect(classCombination.calculFO([DA, SA, CA, C4])).toBe(31404000000);
    });
    test("Brelan bottom et une carte", () => {
      expect(classCombination.calculFO([DA, S10, C10, D10])).toBe(31014000000);
    });
    test("Brelan top et 2 cartes", () => {
      expect(classCombination.calculFO([DA, SA, CA, DQ, SJ])).toBe(31412110000);
    });
    test("Brelan bottom et 2 cartes", () => {
      expect(classCombination.calculFO([DA, DQ, S10, C10, D10])).toBe(
        31014120000
      );
    });
    test("Brelan bottom et 4 cartes", () => {
      expect(classCombination.calculFO([DA, HK, DQ, S10, C10, D10, S2])).toBe(
        31014130000
      );
    });
  });
});
