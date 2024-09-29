"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ArrayGestion_1 = __importDefault(require("./ArrayGestion"));
const Flush_1 = __importDefault(require("./Combinations/Flush"));
const Straight_1 = __importDefault(require("./Combinations/Straight"));
const FourOfAKind_1 = __importDefault(require("./Combinations/FourOfAKind"));
const FullHouse_1 = __importDefault(require("./Combinations/FullHouse"));
const ThreeOfAKind_1 = __importDefault(require("./Combinations/ThreeOfAKind"));
const Pair_1 = __importDefault(require("./Combinations/Pair"));
const StraightFlush_1 = __importDefault(require("./Combinations/StraightFlush"));
const TwoPair_1 = __importDefault(require("./Combinations/TwoPair"));
const HighCard_1 = __importDefault(require("./Combinations/HighCard"));
const FormatAndMath_1 = __importDefault(require("./FormatAndMath"));
class Calculation {
    nbLoop = 0;
    nbRecursion = 4;
    freeCards;
    table;
    players;
    splitScore;
    constructor(obj) {
        this.freeCards = obj.freeCards;
        this.table = obj.table;
        this.players = [];
        obj.players.forEach(element => {
            this.players.push({ id: element.id, cards: [element.card1, element.card2], score: 0 });
        });
        this.splitScore = 0;
        this.nbRecursion = obj.precision;
    }
    //test calculation of cards here
    static test() {
        const arrayTest = [
            { value: "2", symbol: "heart" },
            { value: "8", symbol: "diamond" },
            /*{value : "2", symbol : "diamond"},
            {value : "7", symbol : "heart"},
            {value : "5", symbol : "spade"},
            {value : "Q", symbol : "club"},
            {value : "A", symbol : "spade"},*/
            { value: "10", symbol: "diamond" },
            { value: "A", symbol: "club" },
            { value: "9", symbol: "spade" },
            { value: "5", symbol: "spade" },
            { value: "Q", symbol: "club" }
        ];
        //console.log(ArrayGestion.splitArrayForStraight(arrayTest));
        //console.log(ArrayGestion.splitArrayValue(arrayTest));
        //console.log(ArrayGestion.splitArraySymbol(arrayTest));
        //console.log(this.score(arrayTest));
    }
    //process of calculation
    fullCalculation() {
        //format cards table
        let cards = this.table.cardsTable;
        cards.splice(this.table.numberActivateCard);
        cards = cards.filter(card => card.value !== "0");
        //format nbLoop to make (max : this.nbRecursion)
        const nbLoop = this.table.numberActivateCard - cards.length > this.nbRecursion ? this.nbRecursion : this.table.numberActivateCard - cards.length;
        this.nbLoop = FormatAndMath_1.default.nbLoopCalcul(this.freeCards, nbLoop);
        //calcul
        this.loopRecursion(this.freeCards, cards, nbLoop);
    }
    //recursivity of each combination we can find in the table 
    loopRecursion(freeCards, pickedCards, loop) {
        if (loop == 0) {
            this.scoreEach(pickedCards);
            return;
        }
        else {
            while (freeCards.length > 0) {
                let pickedCardsCopy = pickedCards.slice();
                pickedCardsCopy.push(freeCards[0]);
                freeCards = ArrayGestion_1.default.removeCard(freeCards, freeCards[0]);
                if (freeCards.length < loop - 1) {
                    return;
                }
                this.loopRecursion(freeCards, pickedCardsCopy, loop - 1);
            }
        }
    }
    //for one combination in table, calcul which player one, or splitpot if they are more than one
    scoreEach(cards) {
        let bestScore = 0;
        let bestPlayersIndex = [];
        this.players.forEach((player, index) => {
            //calcul
            let cardArray = player.cards.concat(cards);
            let score = this.score(cardArray);
            //
            //score checking one by one
            if (score > bestScore) {
                bestScore = score;
                bestPlayersIndex = [index];
            }
            else if (score === bestScore) {
                bestPlayersIndex.push(index);
            }
        });
        //points attribution
        (bestPlayersIndex.length > 1) ? this.splitScore++ : this.players[bestPlayersIndex[0]].score++;
    }
    //score a combination of cards from 4 to 7 cards
    score(cards) {
        const sordOrdValue = ArrayGestion_1.default.splitArrayValue(cards);
        const sordOrdSymbol = ArrayGestion_1.default.splitArraySymbol(cards);
        const sordOrdStraight = ArrayGestion_1.default.splitArrayForStraight(cards);
        const flush = Flush_1.default.checkCombination(sordOrdSymbol); //check the player have 5 cards of the sme symbol
        const straight = Straight_1.default.checkCombination(sordOrdStraight); //check the player have 5 cards straighted
        const three = ThreeOfAKind_1.default.checkCombination(sordOrdValue); //check the player have 3 or more cards of the same value
        const two = Pair_1.default.checkCombination(sordOrdValue); //check the player have 2 cards (only two) of the same value
        //check quintFlush
        if (flush && straight) {
            if (StraightFlush_1.default.checkCombination(sordOrdSymbol)) {
                return StraightFlush_1.default.calcul(sordOrdSymbol);
            }
        }
        //check full and square
        if (three) {
            if (FourOfAKind_1.default.checkCombination(sordOrdValue))
                return FourOfAKind_1.default.calcul(sordOrdValue);
            if (FullHouse_1.default.checkCombination(sordOrdValue))
                return FullHouse_1.default.calcul(sordOrdValue);
        }
        //check flush
        if (flush)
            return Flush_1.default.calcul(sordOrdSymbol);
        //check straight
        if (straight)
            return Straight_1.default.calcul(sordOrdStraight);
        //check threeOfAKind
        if (three)
            return ThreeOfAKind_1.default.calcul(sordOrdValue);
        //check2pair
        if (two) {
            if (TwoPair_1.default.checkCombination(sordOrdValue))
                return TwoPair_1.default.calcul(sordOrdValue);
            return Pair_1.default.calcul(sordOrdValue);
        }
        return HighCard_1.default.calcul(sordOrdValue);
    }
    //return the final score formatted
    getFinalScore() {
        return FormatAndMath_1.default.formatResult(this.players, this.splitScore, this.nbLoop);
    }
}
exports.default = Calculation;
//# sourceMappingURL=Calculation.js.map