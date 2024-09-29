"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StraightFlush {
    static checkCombination(combinationCard) {
        const cardValued = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2", "aa"];
        if (combinationCard[0][0].value == "A")
            combinationCard[0].push({ value: "aa", symbol: "" }); //add ace to check straight 5-4-3-2-A
        let serie = 1;
        if (combinationCard[0].length < 5)
            return false;
        for (let i = 1; i < combinationCard[0].length; i++) {
            if ((cardValued.indexOf(combinationCard[0][i - 1].value)) - (cardValued.indexOf(combinationCard[0][i].value)) === -1) {
                serie++;
            }
            else {
                serie = 1;
            }
            ;
            if (serie > 4)
                return true;
        }
        return false;
    }
    static calcul(combinationCard) {
        const cardValued = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2", "aa"];
        const cardValuedReverse = ["aa", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        if (combinationCard[0][0].value == "A")
            combinationCard[0].push({ value: "aa", symbol: "" }); //add ace to calcul straight 5-4-3-2-A
        let result = 8 * 10000000000;
        let leadStraight = cardValuedReverse.indexOf(combinationCard[0][0].value);
        let serie = 1;
        for (let i = 1; i < combinationCard.length; i++) {
            if ((cardValued.indexOf(combinationCard[0][i - 1].value)) - (cardValued.indexOf(combinationCard[0][i].value)) === -1) {
                serie++;
            }
            else {
                serie = 1;
            }
            ;
            if (serie === 1)
                leadStraight = cardValuedReverse.indexOf(combinationCard[0][i].value);
            if (serie > 4)
                break;
        }
        result += leadStraight * 100000000;
        return result;
    }
}
exports.default = StraightFlush;
//# sourceMappingURL=StraightFlush.js.map