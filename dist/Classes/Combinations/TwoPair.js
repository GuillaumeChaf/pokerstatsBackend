"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TwoPair {
    static checkCombination(combinationCard) {
        return combinationCard[0].length === 2 && combinationCard[1].length === 2;
    }
    static calcul(combinationCard) {
        const cardValued = ["aa", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        let result = 2 * 10000000000;
        result += cardValued.indexOf(combinationCard[0][0].value) * 100000000;
        result += cardValued.indexOf(combinationCard[1][0].value) * 1000000;
        if (combinationCard[3] !== undefined) {
            return result + 10000 * Math.max(cardValued.indexOf(combinationCard[2][0].value), cardValued.indexOf(combinationCard[3][0].value));
        }
        if (combinationCard[2] !== undefined) {
            return result + 10000 * cardValued.indexOf(combinationCard[2][0].value);
        }
        return result;
    }
}
exports.default = TwoPair;
//# sourceMappingURL=TwoPair.js.map