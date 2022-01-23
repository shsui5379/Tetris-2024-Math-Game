class DifferenceOfX implements MergeCondition {
   #difference: number;

   constructor() { this.randomizeParameters(); }

   toString(): string {
      return "Numbers with a difference of " + this.#difference;
   }

   randomizeParameters(): void {
      this.#difference = randomInteger(1, 3);
   }

   check(tile1: Tile, tile2: Tile): boolean {
      return Math.abs(<number>tile1.getNumber() - <number>tile2.getNumber()) === this.#difference;
   }

   testUnit(): void {
      let dummyDiv = document.createElement("div");
      let t1 = new Tile(dummyDiv);
      let t2 = new Tile(dummyDiv);

      this.#difference = 2;
      t1.setNumber(1);
      t2.setNumber(3);

      console.assert(this.check(t1, t2) === true); //1, 3
      console.assert(this.check(t2, t1) === true); //3, 1

      t1.setNumber(2);
      console.assert(this.check(t1, t2) === false); //2, 3

      t2.setNumber(5);
      console.assert(this.check(t2, t1) === false); //2, 5

      dummyDiv.remove();
   }
}