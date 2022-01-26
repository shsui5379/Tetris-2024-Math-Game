class CongruentModX implements MergeCondition {
   #x: number;

   constructor() { this.randomizeParameters(); }

   toString(): string {
      return "Numbers that share the same remainder when divided by " + this.#x;
   }

   randomizeParameters(): void {
      this.#x = randomInteger(2, 5);
   }

   check(tile1: Tile, tile2: Tile): boolean {
      return <number>tile1.getNumber() % this.#x === <number>tile2.getNumber() % this.#x;
   }

   testUnit(): void {
      let dummyDiv = document.createElement("div");
      let t1 = new Tile(dummyDiv);
      let t2 = new Tile(dummyDiv);

      this.#x = 3;
      t1.setNumber(1);
      t2.setNumber(3);

      console.assert(this.check(t1, t2) === false); //1, 3

      t1.setNumber(6);
      console.assert(this.check(t2, t1) === true); //6, 3

      dummyDiv.remove();
   }
}