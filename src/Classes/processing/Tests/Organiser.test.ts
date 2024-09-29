import { Card, Symbol } from "../../bases/Card";
import { Player } from "../../bases/Player";
import { ComputePrompt } from "../../bases/Response";
import { statsCallback } from "../../bases/types";
import { Combination } from "../../combinations/Combination";
import { cardsPull } from "../../combinations/Tests/CardsPull";
import { Calculation2 } from "../Calculation2";
import { Organiser } from "../Organiser";
import { players } from "./testObject";

const { P135H, P235S, P5AA, P5AK, P422, P6DAK } = players;
const {
  SA,
  DA,
  CA,
  HA,
  S2,
  D3,
  C3,
  S4,
  D4,
  C4,
  H4,
  C5,
  S5,
  D8,
  S8,
  D9,
  S3,
  D5,
  DQ,
  D7,
  C2,
  CK,
  SK,
  HK,
  DJ,
  D10,
  D6,
  D2,
  C8,
  CQ,
  C10,
  CJ,
  C9,
  C7,
  C6,
} = cardsPull;

describe("Combinaison globale", () => {
  describe("2 joueurs", () => {
    describe("splitting", () => {
      test("Full split 1 seul inconnu", () => {
        const promptsTest = {
          players: [P135H, P235S],
          table: [SA, DA, CA, HA],
          trash: [],
        };
        const res: statsCallback = Organiser.startingProcess(promptsTest);
        expect(res.split.winSplit).toBe(44);
      });
      test("Full split 1 seul inconnu + trash", () => {
        const promptsTest = {
          players: [P135H, P235S],
          table: [SA, DA, CA, HA],
          trash: [D2],
        };
        const res: statsCallback = Organiser.startingProcess(promptsTest);
        expect(res.split.winSplit).toBe(43);
      });
      test("Petit split donc outs, 1 seul inconnu", () => {
        const promptsTest = {
          players: [P5AA, P235S],
          table: [CA, CQ, C10, C8],
          trash: [],
        };
        const res: statsCallback = Organiser.startingProcess(promptsTest);
        expect(res.split).toEqual({
          winSplit: 9,
          winSplitOuts: [CK, CJ, C9, C7, C6, C5, C4, C3, C2].sort(
            (a, b) => a.unique - b.unique
          ),
        });
      });

      test("Petit split donc outs, 1 seul inconnu + trash", () => {
        const promptsTest = {
          players: [P5AA, P235S],
          table: [CA, CQ, C10, C8],
          trash: [C7, C6, C5],
        };
        const res: statsCallback = Organiser.startingProcess(promptsTest);
        expect(res.split).toEqual({
          winSplit: 6,
          winSplitOuts: [CK, CJ, C9, C4, C3, C2].sort(
            (a, b) => a.unique - b.unique
          ),
        });
      });
    });

    describe("main classique", () => {
      test("2 joueurs, paire contre AK et couleur", () => {
        const promptsTest = {
          players: [P6DAK, P422],
          table: [D4, D7, C8],
          trash: [],
        };
        const res: statsCallback = Organiser.startingProcess(promptsTest);
        expect(res.players).toEqual({
          "4": { stat: 424, outs: [] },
          "6": {
            stat: 557,
            outs: [
              CA,
              SA,
              HA,
              CK,
              SK,
              HK,
              DQ,
              DJ,
              D10,
              D9,
              D8,
              D6,
              D5,
              D3,
              D2,
            ].sort((a, b) => a.unique - b.unique),
          },
        });
        expect(res.split).toEqual({
          winSplit: 9,
          winSplitOuts: [],
        });
        expect(res.secondary.combinations).toBe(990);
      });
    });
  });
});
