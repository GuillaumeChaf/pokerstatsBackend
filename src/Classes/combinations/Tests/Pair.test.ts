import Pair from "../Pair";
import { cardsPull } from "./CardsPull";

const classCombination: Pair = new Pair();

describe("Combinaison de paire", () => {
  const { SA, DK, DQ, SJ, D9, S8, DA, S4, S7, D8, S5, D4, S2, D2 } = cardsPull;

  describe("Calcul de table", () => {
    test("Top paire : As", () => {
      expect(classCombination.calcul([DA, SA, DK, DQ, SJ, S8, S4], 14)).toBe(
        11413121100
      );
    });
    test("Paire dans le tas : 8", () => {
      expect(classCombination.calcul([DA, DK, D8, S8, S5, D4, S2], 8)).toBe(
        10814130500
      );
    });
    test("Worst paire : 2", () => {
      expect(classCombination.calcul([SA, D9, D8, S7, S5, D2, S2], 2)).toBe(
        10214090800
      );
    });
  });
  describe("Calcul pour les outs", () => {
    test("Top paire, 2 cartes ", () => {
      expect(classCombination.calculFO([SA, DA], 14)).toBe(11400000000);
    });
    test("Top paire, 3 cartes ", () => {
      expect(classCombination.calculFO([SA, DA, S2], 14)).toBe(11402000000);
    });
    test("Bottom paire, 3 cartes ", () => {
      expect(classCombination.calculFO([SA, D2, S2], 2)).toBe(10214000000);
    });
    test("Top paire, 4 cartes ", () => {
      expect(classCombination.calculFO([SA, DA, D8, S7], 14)).toBe(11408070000);
    });
    test("Bottom paire, 4 cartes ", () => {
      expect(classCombination.calculFO([SA, S5, D2, S2], 2)).toBe(10214050000);
    });
    test("middle paire, 5 cartes ", () => {
      expect(classCombination.calculFO([D8, S7, S4, D4, S2], 4)).toBe(
        10408070200
      );
    });
  });
});
