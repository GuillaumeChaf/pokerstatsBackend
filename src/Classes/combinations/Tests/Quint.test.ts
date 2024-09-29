import Quint from "../Quint";
import { cardsPull } from "./CardsPull";

const classCombination: Quint = new Quint();

describe("Combinaison de la suite", () => {
  describe("Calcul de table", () => {
    test("Quinte au 5 + brelan d'as", () => {
      const { CA, SA, DA, H5, H4, C3, D2 } = cardsPull;
      expect(classCombination.calcul([SA, DA, CA, H5, H4, C3, D2])).toBe(
        40500000000
      );
    });
    test("Quinte et brelan", () => {
      const { SQ, D10, C9, SJ, S9, D9, S8 } = cardsPull;
      expect(classCombination.calcul([SQ, SJ, D10, C9, S9, D9, S8])).toBe(
        41200000000
      );
    });
    test("Quinte et 2 paire", () => {
      const { SQ, D10, DQ, SJ, C10, D9, S8 } = cardsPull;
      expect(classCombination.calcul([SQ, DQ, SJ, D10, C10, D9, S8])).toBe(
        41200000000
      );
    });
    test("Quinte et paire", () => {
      const { CA, D10, DQ, SJ, DA, C9, D8 } = cardsPull;
      expect(classCombination.calcul([CA, DA, DQ, SJ, D10, C9, D8])).toBe(
        41200000000
      );
    });
    test("Quinte au 5 et K", () => {
      const { CA, DK, C7, S5, S4, S3, D2 } = cardsPull;
      expect(classCombination.calcul([CA, DK, C7, S5, S4, S3, D2])).toBe(
        40500000000
      );
    });
    test("Quinte au 5", () => {
      const { CA, DQ, S10, S5, S4, S3, D2 } = cardsPull;
      expect(classCombination.calcul([CA, DQ, S10, S5, S4, S3, D2])).toBe(
        40500000000
      );
    });
    test("Quinte au 6", () => {
      const { CQ, DJ, C6, S5, S4, S3, D2 } = cardsPull;
      expect(classCombination.calcul([CQ, DJ, C6, S5, S4, S3, D2])).toBe(
        40600000000
      );
    });
    test("Quinte middle", () => {
      const { CA, D10, DQ, SJ, C9, S8, S4 } = cardsPull;
      expect(classCombination.calcul([CA, DQ, SJ, D10, C9, S8, S4])).toBe(
        41200000000
      );
    });
    test("Quinte à l'as", () => {
      const { CA, D10, DQ, SJ, DK, D4, C5 } = cardsPull;
      expect(classCombination.calcul([CA, DK, DQ, SJ, D10, C5, D4])).toBe(
        41400000000
      );
    });
    test("Des paires sans quinte", () => {
      const { DA, SA, DK, CK, CQ, DQ, SJ } = cardsPull;
      expect(classCombination.calcul([DA, SA, DK, CK, CQ, DQ, SJ])).toBe(0);
    });
    test("Brelan sans quinte", () => {
      const { DA, SK, CQ, DQ, HQ, CJ, C7 } = cardsPull;
      expect(classCombination.calcul([DA, SK, CQ, DQ, HQ, CJ, C7])).toBe(0);
    });
    test("Presque quinte", () => {
      const { DA, SK, CQ, DJ, S9, C8, C7 } = cardsPull;
      expect(classCombination.calcul([DA, SK, CQ, DJ, S9, C8, C7])).toBe(0);
    });
  });
  describe("Calcul pour les outs", () => {
    const { DA, SK, CQ, DQ, HQ, SQ, SA, DJ, H10, S9, C8, S5, S4, S3, D2 } =
      cardsPull;
    test("Paires sans quinte 5 carte", () => {
      expect(classCombination.calcul([DA, SA, CQ, DQ, S9])).toBe(0);
    });
    test("Presque quinte 5 cartes", () => {
      expect(classCombination.calcul([DA, SK, CQ, DJ, S9])).toBe(0);
    });
    test("Brelan 5 cartes", () => {
      expect(classCombination.calcul([DA, SK, CQ, DQ, HQ])).toBe(0);
    });
    test("Quinte 5 cartes", () => {
      expect(classCombination.calcul([DA, SK, CQ, DJ, H10])).toBe(41400000000);
    });
    test("Quinte 5 cartes au 5", () => {
      expect(classCombination.calcul([DA, S5, S4, S3, D2])).toBe(40500000000);
    });
    test("Quinte de 6 cartes", () => {
      expect(classCombination.calcul([SK, CQ, DJ, H10, S9, C8])).toBe(
        41300000000
      );
    });
    test("Quinte + paire", () => {
      expect(classCombination.calcul([SK, CQ, DQ, DJ, H10, S9])).toBe(
        41300000000
      );
    });
    test("Quinte faussé dame et 4", () => {
      expect(classCombination.calcul([DA, SK, SQ, S4, S3, D2])).toBe(0);
    });
  });
});
