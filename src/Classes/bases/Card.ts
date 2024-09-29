export class Card {
  /** symbole de la carte (coeur, trèfle...) */
  symbol!: Symbol;
  /** valeur (As, roi...) */
  value!: number;

  get unique(): number {
    return this.symbol * 100 + this.value;
  }
  constructor({ symbol, value }: Card) {
    this.symbol = symbol;
    this.value = value;
  }

  static getSet(): { [key: string]: Card } {
    const set: { [key: string]: Card } = {};
    let s = 0;
    while (s < 4) {
      let v = 2;
      while (v < 15) {
        const c = new Card({ symbol: s, value: v } as Card);
        set[c.unique] = c;
        v++;
      }
      s++;
    }
    return set;
  }

  static displaySet(set: Card[]) {
    let res = "";
    set.forEach((v) => {
      res += `${Symbol[v.symbol]},${stringBySymbol[v.value] ?? v.value};`;
    });
    return res;
  }
}

export const stringBySymbol: { [key: number]: string } = {
  11: "J",
  12: "Q",
  13: "K",
  14: "A",
};
export enum Symbol {
  Club,
  Heart,
  Spade,
  Diamond,
}
