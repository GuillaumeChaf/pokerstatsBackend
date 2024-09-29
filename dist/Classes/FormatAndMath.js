"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FormatAndMath {
    //format the result of the calculation
    static formatResult(playersCalc, splitScore, nbLoop) {
        const players = playersCalc.map((player) => { return { id: player.id, score: FormatAndMath.formatScorePerc(player.score, nbLoop) }; });
        return { players: players,
            splitScore: FormatAndMath.formatScorePerc(splitScore, nbLoop) };
    }
    //format a statistic in percentage with the nbDecimals after coma
    static formatScorePerc(score, nbLoop) {
        const nbDecimals = 2;
        const round = 100 * Math.pow(10, nbDecimals);
        return Math.round(((score) * round / nbLoop)) * 100 / round;
    }
    //number of loops of calculation made to calcul one stats
    static nbLoopCalcul(cards, nbLoop) {
        const totCard = cards.length;
        return FormatAndMath.fact(totCard, totCard - nbLoop) / FormatAndMath.fact(nbLoop);
    }
    //return the factorielle of a number (fact 5 = 5*4*3*2*1)
    //tot : the number you want the fact
    //lim : the limit of the fact (exemple : (tot = 6, lim = 4) return 6*5*4)
    static fact(tot, lim = 0) {
        let result = 1;
        while (tot > lim) {
            result *= tot;
            tot--;
        }
        return result;
    }
}
exports.default = FormatAndMath;
//# sourceMappingURL=FormatAndMath.js.map