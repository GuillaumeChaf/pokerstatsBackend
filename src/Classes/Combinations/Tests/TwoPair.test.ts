import TwoPair from "../TwoPair";
import { cardsPull } from "./CardsPull";

const classCombination: TwoPair = new TwoPair();

describe("Combinaison de 2 paires", () => {
  describe("Calcul de table", () => {
    test("triple paire max", () => {
      const { SA, CQ, DQ, SJ, CJ, DA, S4 } = cardsPull;
      expect(classCombination.calcul([DA, SA, CQ, DQ, SJ, CJ, S4], 14)).toBe(
        21412110000
      );
    });
    test("triple paire", () => {
      const { SA, CQ, DQ, SJ, C4, DA, S4 } = cardsPull;
      expect(classCombination.calcul([DA, SA, CQ, DQ, SJ, C4, S4], 14)).toBe(
        21412110000
      );
    });
    test("2 paires basses", () => {
      const { C2, DK, DQ, D4, S2, DA, S4 } = cardsPull;
      expect(classCombination.calcul([DA, DK, DQ, S4, D4, S2, C2], 4)).toBe(
        20402140000
      );
    });
    test("Une paire haute et une basse", () => {
      const { CK, DK, CQ, SJ, D8, D4, S4 } = cardsPull;
      expect(classCombination.calcul([DK, CK, CQ, SJ, D8, D4, S4], 13)).toBe(
        21304120000
      );
    });
    test("Double paire haute", () => {
      const { SA, S10, DQ, SQ, S8, DA, S4 } = cardsPull;
      expect(classCombination.calcul([DA, SA, DQ, SQ, S10, S8, S4], 14)).toBe(
        21412100000
      );
    });
    test("Une seule paire d'As", () => {
      const { D8, S2, D4, DA, S7, S5, CA } = cardsPull;
      expect(classCombination.calcul([DA, CA, D8, S7, S5, D4, S2], 14)).toBe(0);
    });
    test("Une seule paire de 2", () => {
      const { S2, D2, D8, D9, S5, S7, SA } = cardsPull;
      expect(classCombination.calcul([SA, D9, D8, S7, S5, D2, S2], 2)).toBe(0);
    });
  });
  describe("Calcul pour les outs", () => {
    const { DA, DQ, S2, D2, D8, S8, D9, S5, S7, SA } = cardsPull;
    test("Paire simple", () => {
      expect(classCombination.calculFO([D2, S2], 2)).toBe(0);
    });
    test("Paire et carte haute", () => {
      expect(classCombination.calculFO([S8, D8, S2], 8)).toBe(0);
    });
    test("Paire et 3 cartes", () => {
      expect(classCombination.calculFO([S8, D8, S7, S5, S2], 8)).toBe(0);
    });
    test("3 cartes et paire", () => {
      expect(classCombination.calculFO([SA, D9, D8, D2, S2], 2)).toBe(0);
    });
    test("2 paires", () => {
      expect(classCombination.calculFO([D8, D8, D2, S2], 8)).toBe(20802000000);
    });
    test("1 carte et 2 paire", () => {
      expect(classCombination.calculFO([SA, D8, D8, D2, S2], 8)).toBe(
        20802140000
      );
    });
    test("3 cartes et 2 paires", () => {
      expect(classCombination.calculFO([SA, DQ, D9, D8, S8, D2, S2], 8)).toBe(
        20802140000
      );
    });
    test("3 paires, sans rien", () => {
      expect(classCombination.calculFO([SA, DA, D8, D8, D2, S2], 14)).toBe(
        21408020000
      );
    });
  });
});
