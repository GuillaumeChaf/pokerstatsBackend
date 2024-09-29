import HighCard from "../HighCard";
import { cardsPull } from "./CardsPull";

const classCombination: HighCard = new HighCard();

describe("Combinaison à hauteur", () => {
  describe("Calcul de table", () => {
    test("Hauteur maximum : As", () => {
      const { S2, S4, D8, D9, S3, DA, D5 } = cardsPull;
      expect(classCombination.calcul([DA, D9, D8, D5, S4, S3, S2])).toBe(
        1409080504
      );
    });
    test("Hauteur minimum : 9", () => {
      const { S2, S4, D8, D9, S3, D7, D5 } = cardsPull;
      expect(classCombination.calcul([D9, D8, D7, D5, S4, S3, S2])).toBe(
        908070504
      );
    });
  });

  describe("Calcul pour les outs", () => {
    const { S2, S4, D8, D9, S3, D7, D5 } = cardsPull;
    test("Table vide", () => {
      expect(classCombination.calculFO([])).toBe(0);
    });
    test("1 cartes", () => {
      expect(classCombination.calculFO([D9])).toBe(900000000);
    });
    test("2 cartes", () => {
      expect(classCombination.calculFO([D9, S4])).toBe(904000000);
    });
    test("3 cartes", () => {
      expect(classCombination.calculFO([D9, D5, S4])).toBe(905040000);
    });
    test("4 cartes", () => {
      expect(classCombination.calculFO([D9, D8, D5, S4])).toBe(908050400);
    });
    test("5 cartes", () => {
      expect(classCombination.calculFO([D9, D8, D5, S4, S3])).toBe(908050403);
    });
    test("6 cartes", () => {
      expect(classCombination.calculFO([D9, D8, D7, D5, S4, S3])).toBe(
        908070504
      );
    });
  });
});
