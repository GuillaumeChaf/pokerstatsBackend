import {Player, Card} from "./Calculation";

export default class FormatAndMath{

    static formatResult(playersCalc : Player[], splitScore : number, nbLoop : number) : Object{
        const players =  playersCalc.map((player) => {return {id : player.id, score : FormatAndMath.formatScorePerc(player.score,nbLoop)}});
        return {players : players,
            splitScore : FormatAndMath.formatScorePerc(splitScore,nbLoop)}
    }

    static formatScorePerc(score : number, nbLoop : number) : number{
        const nbDecimals : number = 2;
        const round : number = 100 * Math.pow(10,nbDecimals);
        return Math.round(((score) * round/ nbLoop)) * 100 / round;
    }

    static nbLoopCalcul(cards : Card[], nbLoop : number) : number{
        const totCard = cards.length;
        return FormatAndMath.fact(totCard, totCard - nbLoop)/FormatAndMath.fact(nbLoop);
    }

    static fact(tot : number, lim : number = 0) : number{
        let result = 1;
        while(tot > lim){
            result *= tot;
            tot--;
        }
        return result;
    }
}