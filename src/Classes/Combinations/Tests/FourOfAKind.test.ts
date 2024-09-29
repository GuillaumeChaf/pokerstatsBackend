import FourOfAKind from "../FourOfAKind";
import { cardsPull } from "./CardsPull";

const classCombination: FourOfAKind = new FourOfAKind();

const { SA, DA, CA, HA, S2, S4, D4, C4, H4, D8, S8, D9, S3, D5 } = cardsPull;

describe("Combinaison de carré", () => {
  describe("Calcul de table", () => {
    test("top square", () => {
      expect(classCombination.calcul([SA, DA, CA, HA, D9, D8, S3])).toBe(
        71409000000
      );
    });
    test("bottom square", () => {
      expect(classCombination.calcul([SA, D9, D8, S4, D4, C4, H4])).toBe(
        70414000000
      );
    });
    test("top square et paire", () => {
      expect(classCombination.calcul([SA, DA, CA, HA, D8, D4, C4])).toBe(
        71408000000
      );
    });
    test("bottom square et paire", () => {
      expect(classCombination.calcul([SA, S8, D8, S4, D4, C4, H4])).toBe(
        70414000000
      );
    });
    test("top square et brelan", () => {
      expect(classCombination.calcul([SA, DA, CA, HA, D4, C4, H4])).toBe(
        71404000000
      );
    });
    test("bottom square et brelan", () => {
      expect(classCombination.calcul([SA, DA, CA, S4, D4, C4, H4])).toBe(
        70414000000
      );
    });
  });
  describe("Calcul pour les outs", () => {
    test("carré, 4 cartes", () => {
      expect(classCombination.calculFO([S4, D4, C4, H4])).toBe(70400000000);
    });
    test("high + carré, 5 cartes", () => {
      expect(classCombination.calculFO([CA, S4, D4, C4, H4])).toBe(70414000000);
    });
    test("carré + high, 5 cartes", () => {
      expect(classCombination.calculFO([SA, DA, CA, HA, H4])).toBe(71404000000);
    });
    test("2 high + carré, 6 cartes", () => {
      expect(classCombination.calculFO([SA, D9, S4, D4, C4, H4])).toBe(
        70414000000
      );
    });
    test("carré + 2 neutre, 6 cartes", () => {
      expect(classCombination.calculFO([SA, DA, CA, HA, D9, H4])).toBe(
        71409000000
      );
    });
    test("3 high + carré, 7 cartes", () => {
      expect(classCombination.calculFO([SA, D9, S8, S4, D4, C4, H4])).toBe(
        70414000000
      );
    });
    test("carré + 3 high, 7 cartes", () => {
      expect(classCombination.calculFO([SA, DA, CA, HA, D9, S8, S4])).toBe(
        71409000000
      );
    });
    test("2 high + carré, 7 cartes", () => {
      expect(classCombination.calculFO([SA, S8, S4, D4, C4, H4, S3])).toBe(
        70414000000
      );
    });
    test("brelan + carré, 7 cartes", () => {
      expect(classCombination.calculFO([SA, DA, CA, S4, D4, C4, H4])).toBe(
        70414000000
      );
    });
    test("carré + brelan, 7 cartes", () => {
      expect(classCombination.calculFO([SA, DA, CA, HA, D4, C4, H4])).toBe(
        71404000000
      );
    });
  });
});
