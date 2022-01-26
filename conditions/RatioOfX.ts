class RatioOfX implements MergeCondition {
   #ratio: number;

   constructor() { this.randomizeParameters(); }

   toString(): string {
      return "Numbers with a ratio of " + this.#ratio;
   }

   randomizeParameters(): void {
      this.#ratio = randomInteger(1, 3);
   }

   check(tile1: Tile, tile2: Tile): boolean {
      return <number>tile1.getNumber() / <number>tile2.getNumber() === this.#ratio || <number>tile2.getNumber() / <number>tile1.getNumber() === this.#ratio;
   }

   testUnit(): void {
      let dummyDiv = document.createElement("div");
      let t1 = new Tile(dummyDiv);
      let t2 = new Tile(dummyDiv);

      this.#ratio = 2;
      t1.setNumber(1);
      t2.setNumber(3);

      console.assert(this.check(t1, t2) === false); //1, 3
      console.assert(this.check(t2, t1) === false); //3, 1

      t1.setNumber(6);
      console.assert(this.check(t1, t2) === true); //6, 3
      console.assert(this.check(t2, t1) === true); //3, 6

      dummyDiv.remove();
   }
}