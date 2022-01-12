interface MergeCondition{
    check(tile1: Tile, tile2: Tile): boolean;
    toString(): string;
    randomizeParameters(): void;
}

var possibleConditions: MergeCondition[] = [];
class SumToPrimeNumber implements MergeCondition {
  #value: number;
  #parity: string;

  constructor() { this.randomizeParameters(); }

  toString(): string { /* implement */ return "";}
  randomizeParameters(): void {
      //Testing
      this.#value = 1;
      this.#parity = "odd";
  }
  check(tile1: Tile, tile2: Tile): boolean { /* implement */ return true;}

  someHelperMethod(): number { /* implement */ return -1;}
}
possibleConditions.push(new SumToPrimeNumber());

//Test
console.log(possibleConditions[0]);

