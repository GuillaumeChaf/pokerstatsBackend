import Flush from "../Flush";
import { cardsPull } from "./CardsPull";

const classCombination: Flush = new Flush();

describe("Combinaison de couleur", () => {
  describe("Calcul de table", () => {
    const { SA, DA, CA, CK, C8, CQ, C5, C4, C3, C2 } = cardsPull;
    test("Couleur 7", () => {
      expect(classCombination.calcul([C3, C2, CA, CQ, C5, C4, C8])).toBe(
        51412080504
      );
    });
    test("Couleur 6", () => {
      expect(classCombination.calcul([SA, C2, CA, CQ, C5, C4, C3])).toBe(
        51412050403
      );
    });
    test("Couleur 5", () => {
      expect(classCombination.calcul([SA, DA, CA, CK, CQ, C3, C2])).toBe(
        51413120302
      );
    });
  });
  describe("Calcul pour les outs", () => {
    const { SA, DA, CA, CK, C8, CQ, D6, C3, C2, D2 } = cardsPull;
    test("Couleur 5, 7 cartes", () => {
      expect(classCombination.calculFO([SA, DA, CA, CK, CQ, C3, C2])).toBe(
        51413120302
      );
    });
    test("Couleur 6, 6 cartes", () => {
      expect(classCombination.calculFO([CA, CK, CQ, C8, C3, C2])).toBe(
        51413120803
      );
    });
    test("Couleur 5 top, 6 cartes", () => {
      expect(classCombination.calculFO([CA, CK, CQ, C3, C8, D2])).toBe(
        51413120803
      );
    });
    test("Couleur 5 middle, 6 cartes", () => {
      expect(classCombination.calculFO([CK, CQ, C8, C3, C2, D6])).toBe(
        51312080302
      );
    });
    test("Couleur 5 bottom, 6 cartes", () => {
      expect(classCombination.calculFO([SA, CK, CQ, C8, C3, C2])).toBe(
        51312080302
      );
    });
    test("Couleur 5, 5 cartes", () => {
      expect(classCombination.calculFO([CA, CQ, C3, C2, CK])).toBe(51413120302);
    });
  });
});
