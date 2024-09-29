import Flush from "../Flush";
import { Helpers } from "../Helpers";
import QuintFlush from "../QuintFlush";
import { cardsPull } from "./CardsPull";

const classCombination = new QuintFlush();

describe("Combinaison de la QuintFlush", () => {
  describe("Calcul de table", () => {
    test("Quinte au 5 + brelan d'as", () => {
      const { SA, DA, CA, D5, D4, D3, D2 } = cardsPull;
      expect(
        classCombination.calcul(
          Helpers.sortByFlush([SA, DA, CA, D5, D4, D3, D2])
        )
      ).toBe(80500000000);
    });
    test("Quinte et brelan", () => {
      const { DQ, DJ, D10, C9, S9, D9, D8 } = cardsPull;
      expect(
        classCombination.calcul(
          Helpers.sortByFlush([DQ, DJ, D10, C9, S9, D9, D8])
        )
      ).toBe(81200000000);
    });
    test("Quinte et 2 paire", () => {
      const { SQ, DQ, DJ, D10, C10, D9, D8 } = cardsPull;
      expect(
        classCombination.calcul(
          Helpers.sortByFlush([SQ, DQ, DJ, D10, C10, D9, D8])
        )
      ).toBe(81200000000);
    });
    test("Quinte et paire", () => {
      const { CA, DA, DQ, DJ, D10, D9, D8 } = cardsPull;
      expect(
        classCombination.calcul(
          Helpers.sortByFlush([CA, DA, DQ, DJ, D10, D9, D8])
        )
      ).toBe(81200000000);
    });
    test("Quinte au 5 et K", () => {
      const { DA, DK, D7, D5, D4, D3, D2 } = cardsPull;
      expect(
        classCombination.calcul(
          Helpers.sortByFlush([DA, DK, D7, D5, D4, D3, D2])
        )
      ).toBe(80500000000);
    });
    test("Quinte au 5", () => {
      const { CA, DQ, D4, D5, DA, D3, D2 } = cardsPull;
      expect(
        classCombination.calcul(
          Helpers.sortByFlush([CA, DQ, D4, D5, DA, D3, D2])
        )
      ).toBe(80500000000);
    });
    test("Quinte au 6", () => {
      const { D8, DJ, D6, D5, D4, D3, D2 } = cardsPull;
      expect(
        classCombination.calcul(
          Helpers.sortByFlush([D8, DJ, D6, D5, D4, D3, D2])
        )
      ).toBe(80600000000);
    });
    test("Quinte middle", () => {
      const { DA, DQ, DJ, D10, D9, D8, S4 } = cardsPull;
      expect(
        classCombination.calcul(
          Helpers.sortByFlush([DA, DQ, DJ, D10, D9, D8, S4])
        )
      ).toBe(81200000000);
    });
    test("Quinte à l'as", () => {
      const { DA, DK, DQ, DJ, D10, C5, D4 } = cardsPull;
      expect(
        classCombination.calcul(
          Helpers.sortByFlush([DA, DK, DQ, DJ, D10, C5, D4])
        )
      ).toBe(81400000000);
    });
    test("Quinte mais pas flush", () => {
      const { D8, D7, S6, D5, D4, SK, DK } = cardsPull;
      expect(
        classCombination.calcul(
          Helpers.sortByFlush([D8, D7, S6, D5, D4, SK, DK])
        )
      ).toBe(0);
    });
    test("Des paires sans quinte", () => {
      const { DA, SA, DK, CK, DQ, D2, D9 } = cardsPull;
      expect(
        classCombination.calcul(
          Helpers.sortByFlush([DA, SA, DK, CK, DQ, D2, D9])
        )
      ).toBe(0);
    });
    test("Brelan sans quinte", () => {
      const { DA, DK, CQ, DQ, HQ, DJ, D7 } = cardsPull;
      expect(
        classCombination.calcul(
          Helpers.sortByFlush([DA, DK, CQ, DQ, HQ, DJ, D7])
        )
      ).toBe(0);
    });
    test("Presque quinte", () => {
      const { DA, DK, DQ, DJ, D9, C8, C7 } = cardsPull;
      expect(
        classCombination.calcul(
          Helpers.sortByFlush([DA, DK, DQ, DJ, D9, C8, C7])
        )
      ).toBe(0);
    });
  });
  describe("Calcul des outs", () => {
    const { DA, DK, DQ, DJ, D10, H10, D9, D8, D7, S6, H5, D5, D4, D3, D2 } =
      cardsPull;
    test("Presque quinte, 5 cartes", () => {
      expect(
        classCombination.calculFO(Helpers.sortByFlush([DA, DK, DQ, DJ, D9]))
      ).toBe(0);
    });
    test("Presque quinte, 5 cartes (2)", () => {
      expect(
        classCombination.calculFO(Helpers.sortByFlush([DA, DQ, DJ, D10, D9]))
      ).toBe(0);
    });
    test("Quinte, 5 cartes", () => {
      expect(
        classCombination.calculFO(Helpers.sortByFlush([DA, DK, DQ, DJ, D10]))
      ).toBe(81400000000);
    });
    test("Quinte au 5, 5 cartes", () => {
      expect(
        classCombination.calculFO(Helpers.sortByFlush([D5, D4, DA, D3, D2]))
      ).toBe(80500000000);
    });
    test("Preque quinte, 6 cartes", () => {
      expect(
        classCombination.calculFO(
          Helpers.sortByFlush([DA, DK, DQ, H5, D2, D10])
        )
      ).toBe(0);
    });
    test("Preque quinte, 6 cartes coloré", () => {
      expect(
        classCombination.calculFO(
          Helpers.sortByFlush([D2, D3, DK, DQ, DJ, D10])
        )
      ).toBe(0);
    });
    test("Preque quinte + paire, 6 cartes", () => {
      expect(
        classCombination.calculFO(
          Helpers.sortByFlush([DA, DK, DQ, D10, H10, D9])
        )
      ).toBe(0);
    });
    test("Quinte au 5, 6 cartes coloré", () => {
      expect(
        classCombination.calculFO(Helpers.sortByFlush([DK, D5, D4, DA, D3, D2]))
      ).toBe(80500000000);
    });
    test("Quinte + paire, 6 cartes", () => {
      expect(
        classCombination.calculFO(
          Helpers.sortByFlush([DA, DK, DQ, DJ, D10, H10])
        )
      ).toBe(81400000000);
    });
    test("Quinte de 6, 6 cartes", () => {
      expect(
        classCombination.calculFO(
          Helpers.sortByFlush([DK, DQ, DJ, D10, D9, D8])
        )
      ).toBe(81300000000);
    });

    test("Quinte mais pas flush, 6 cartes", () => {
      expect(
        classCombination.calculFO(Helpers.sortByFlush([D8, D7, S6, D5, D4, D3]))
      ).toBe(0);
    });
  });
});
