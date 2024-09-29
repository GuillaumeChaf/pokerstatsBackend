import FullHouse from "../Full";
import { cardsPull } from "./CardsPull";

const classCombination: FullHouse = new FullHouse();

const { SA, SQ, DA, CA, S2, C9, D4, C4, C7, H4, D9, S9, C8, D5, C5, H5, S5 } =
  cardsPull;

describe("Combinaison de Full", () => {
  describe("Calcul de table", () => {
    test("classic", () => {
      expect(classCombination.calcul([SA, DA, CA, D5, C5, D4, S2], 5)).toBe(
        61405000000
      );
    });
    test("paire puis brelan", () => {
      expect(classCombination.calcul([SA, DA, D9, D5, H5, S5, C4], 14)).toBe(
        60514000000
      );
    });
    test("high puis paire puis brelan", () => {
      expect(classCombination.calcul([SA, SQ, D5, C5, H4, C4, D4], 5)).toBe(
        60405000000
      );
    });
    test("paire, paire, brelan", () => {
      expect(classCombination.calcul([SA, DA, D9, C9, D5, H5, S5], 14)).toBe(
        60514000000
      );
    });
    test("paire, high, brelan", () => {
      expect(classCombination.calcul([SA, DA, SQ, C9, D5, H5, S5], 14)).toBe(
        60514000000
      );
    });
    test("high, brelan, paire", () => {
      expect(classCombination.calcul([SA, C9, D9, S9, C8, S5, D5], 5)).toBe(
        60905000000
      );
    });
    test("high, brelan, brelan", () => {
      expect(
        classCombination.calcul([SA, C9, D9, S9, D5, S5, D5], undefined)
      ).toBe(60905000000);
    });
    test("brelan, high, brelan", () => {
      expect(
        classCombination.calcul([C9, D9, S9, C8, S5, D5, D5], undefined)
      ).toBe(60905000000);
    });
    test("brelan, brelan, high", () => {
      expect(
        classCombination.calcul([C9, D9, S9, C5, S5, D5, S2], undefined)
      ).toBe(60905000000);
    });
  });
  describe("Calcul pour les outs", () => {
    test("brelan + paire, 5 cartes", () => {
      expect(classCombination.calcul([C9, D9, S9, S5, D5], 5)).toBe(
        60905000000
      );
    });
    test("paire + brelan,5 cartes", () => {
      expect(classCombination.calcul([C9, D9, S5, H5, D5], 9)).toBe(
        60509000000
      );
    });
    test("paire + neutre + brelan,6 cartes", () => {
      expect(classCombination.calcul([C9, D9, C8, S5, H5, D5], 9)).toBe(
        60509000000
      );
    });
    test("neutre + brelan + paire,6 cartes", () => {
      expect(classCombination.calcul([SA, C9, D9, S9, S5, D5], 5)).toBe(
        60905000000
      );
    });
    test("paire + brelan + neutre, 6 cartes", () => {
      expect(classCombination.calcul([C9, D9, H5, S5, D5, S2], 9)).toBe(
        60509000000
      );
    });
    test("paire + 2neutres + brelan, 7 cartes", () => {
      expect(classCombination.calcul([C9, S9, C8, C7, S5, D5, C5], 9)).toBe(
        60509000000
      );
    });
    test("2 neutres + paire + brelan, 7 cartes", () => {
      expect(classCombination.calcul([SA, SQ, C9, D9, C5, S5, D5], 9)).toBe(
        60509000000
      );
    });
    test("brelan + brelan, 6 cartes", () => {
      expect(classCombination.calcul([C9, D9, S9, S5, D5, C5], undefined)).toBe(
        60905000000
      );
    });
  });
});
