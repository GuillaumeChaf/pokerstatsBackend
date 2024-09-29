import { Card } from "../bases/Card";
import { ComputePrompt } from "../bases/Response";
import { statsCallback } from "../bases/types";
import { Calculation2 } from "./Calculation2";

export class Organiser {
  static startingProcess(prompts: ComputePrompt): statsCallback {
    const calc = new Calculation2(prompts);
    calc.preProcess();
    calc.process();
    const players: { [key: string]: { stat: number; outs: Card[] } } = {};
    for (let p in calc.players) {
      const { id, conditionRespect, outs } = calc.players[p];
      players[id] = {
        stat: conditionRespect,
        outs,
      };
    }
    return {
      players,
      split: calc.split,
      secondary: {
        combinations: calc.combinations,
        computationTime: (new Date().getTime() - calc.time.getTime()) / 1000,
      },
    };
  }
}
