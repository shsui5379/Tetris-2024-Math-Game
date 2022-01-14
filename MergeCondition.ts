interface MergeCondition{
    check(tile1: Tile, tile2: Tile): boolean;
    toString(): string;
    randomizeParameters(): void;
}

var possibleConditions: MergeCondition[] = [{
    check(tile1: Tile, tile2: Tile): boolean{
        return ((tile1.getNumber() || 0) + (tile2.getNumber() || 0 ) < 10);
    },
    toString(): string{ return ""},
    randomizeParameters(): void {return}
}];

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
//possibleConditions.push(new SumToPrimeNumber());

//Test
//console.log(possibleConditions[0]);

