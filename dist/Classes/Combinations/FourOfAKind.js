"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FourOfAKind {
    static checkCombination(combinationCard) {
        return combinationCard[0].length > 3;
    }
    static calcul(combinationCard) {
        const cardValued = ["aa", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        let result = 7 * 10000000000;
        result += cardValued.indexOf(combinationCard[0][0].value) * 100000000;
        if (combinationCard[1] === undefined)
            return result;
        if (combinationCard[2] === undefined)
            return result + cardValued.indexOf(combinationCard[1][0].value) * 1000000;
        return result + Math.max(cardValued.indexOf(combinationCard[1][0].value), cardValued.indexOf(combinationCard[2][0].value)) * 1000000;
    }
}
exports.default = FourOfAKind;
//# sourceMappingURL=FourOfAKind.js.map