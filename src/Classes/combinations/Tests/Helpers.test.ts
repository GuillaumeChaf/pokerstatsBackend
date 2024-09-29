import { Helpers } from "../Helpers";
import { cardsPull } from "./CardsPull";

const {
  HA,
  DA,
  DK,
  SK,
  S10,
  D7,
  S7,
  S6,
  D6,
  S5,
  D9,
  D3,
  S2,
  DQ,
  D2,
  S4,
  SA,
  S8,
  D10,
  C10,
  CA,
  S3,
  C2,
  H10,
  SQ,
  D8,
  DJ,
  D5,
  D4,
} = cardsPull;

describe("Test des helpers", () => {
  describe("Classement par valeur (décroissant)", () => {
    test("tri 10", () => {
      expect(
        Helpers.sortByValue([DK, D7, S2, DA, S6, D6, S10, D3, SK, S7])
      ).toEqual([DA, DK, SK, S10, D7, S7, S6, D6, D3, S2]);
    });
    test("tri d'un carré", () => {
      expect(Helpers.sortByValue([SA, DA, CA, S3, C2, S5, HA])).toEqual([
        SA,
        DA,
        CA,
        HA,
        S5,
        S3,
        C2,
      ]);
    });
    test("tri 2", () => {
      expect(Helpers.sortByValue([S5, DK])).toEqual([DK, S5]);
    });
    test("tri vide", () => {
      expect(Helpers.sortByValue([])).toEqual([]);
    });
  });
  describe("Classement par symbole (décroissant)", () => {
    test("tri 10", () => {
      expect(
        Helpers.sortByFlush([DK, D7, S2, DA, S6, D6, S10, D3, SK, S7])
      ).toEqual([DK, D7, DA, D6, D3, S2, S6, S10, SK, S7]);
    });
    test("tri 2", () => {
      expect(Helpers.sortByFlush([S5, DK])).toEqual([DK, S5]);
    });
    test("tri vide", () => {
      expect(Helpers.sortByFlush([])).toEqual([]);
    });
  });

  describe("Paire la plus haute", () => {
    test("Carré et brelan", () => {
      expect(
        Helpers.valuePair(Helpers.sortByValue([D2, H10, S10, D10, C2, S2, C10]))
      ).toBeUndefined();
    });
    test("Carré sans paire", () => {
      expect(
        Helpers.valuePair(Helpers.sortByValue([DK, S8, S10, D10, H10, D2, C10]))
      ).toBeUndefined();
    });
    test("Carré et paire", () => {
      expect(
        Helpers.valuePair(Helpers.sortByValue([DK, D10, S10, H10, D2, SK, C10]))
      ).toBe(13);
    });
    test("Brelan sans paire", () => {
      expect(
        Helpers.valuePair(Helpers.sortByValue([DA, S8, SA, D9, CA, S4, C2]))
      ).toBeUndefined();
    });
    test("Brelan et paire", () => {
      expect(
        Helpers.valuePair(Helpers.sortByValue([DA, S8, SA, D8, CA, S4, C2]))
      ).toBe(8);
    });
    test("Multiple paire", () => {
      expect(
        Helpers.valuePair(Helpers.sortByValue([DK, D10, S10, SA, SK, D3, S3]))
      ).toBe(13);
    });
    test("Une seule paire", () => {
      expect(
        Helpers.valuePair(Helpers.sortByValue([SQ, D10, S10, SA, SK, D2, S3]))
      ).toBe(10);
    });
    test("Aucune paire", () => {
      expect(
        Helpers.valuePair(Helpers.sortByValue([DK, S7, S10, DQ, D2, S4, SA]))
      ).toBeUndefined();
    });
  });
  describe("MaxSame", () => {
    test("Carré et brelan", () => {
      expect(
        Helpers.maxSame(Helpers.sortByValue([C10, SA, S10, D10, DA, CA, H10]))
      ).toBe(4);
    });
    test("2 brelans", () => {
      expect(
        Helpers.maxSame(Helpers.sortByValue([C10, SA, S10, D2, DA, CA, H10]))
      ).toBe(3);
    });
    test("brelan + paire", () => {
      expect(
        Helpers.maxSame(Helpers.sortByValue([C10, S5, S10, D10, DA, CA, D3]))
      ).toBe(3);
    });
    test("plein de paire", () => {
      expect(
        Helpers.maxSame(Helpers.sortByValue([C10, S5, S10, S3, DA, CA, D3]))
      ).toBe(2);
    });
    test("Une paire", () => {
      expect(
        Helpers.maxSame(Helpers.sortByValue([C10, S5, DQ, D10, S4, CA, D3]))
      ).toBe(2);
    });
    test("Rien", () => {
      expect(
        Helpers.maxSame(Helpers.sortByValue([C10, S5, DQ, DJ, S4, CA, D3]))
      ).toBe(1);
    });
  });
  describe("MaxFlush", () => {
    test("7", () => {
      expect(
        Helpers.maxFlush(Helpers.sortByFlush([D10, D5, D2, DQ, DJ, D4, D3]))
      ).toBe(7);
    });
    test("6", () => {
      expect(
        Helpers.maxFlush(Helpers.sortByFlush([D10, D5, S5, DQ, DJ, D4, D3]))
      ).toBe(6);
    });
    test("5", () => {
      expect(
        Helpers.maxFlush(Helpers.sortByFlush([C10, D5, S5, DQ, DJ, D4, D3]))
      ).toBe(5);
    });
    test("Double 3", () => {
      expect(
        Helpers.maxFlush(Helpers.sortByFlush([C10, S5, DQ, DJ, S4, S2, D3]))
      ).toBe(3);
    });
    test("3", () => {
      expect(
        Helpers.maxFlush(Helpers.sortByFlush([C10, S5, DQ, DJ, S4, CA, D3]))
      ).toBe(3);
    });
  });
});
