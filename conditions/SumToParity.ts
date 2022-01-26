class SumToParity implements MergeCondition {
   #parity: "even" | "odd";

   constructor() { this.randomizeParameters(); }

   toString(): string {
      return "Numbers that sum to an " + this.#parity + " number";
   }

   randomizeParameters(): void {
      this.#parity = (Math.random() < 0.5) ? "odd" : "even";
   }

   check(tile1: Tile, tile2: Tile): boolean {
      return this.#parity === "odd" && (<number>tile1.getNumber() + <number>tile2.getNumber()) % 2 === 1 || this.#parity === "even" && (<number>tile1.getNumber() + <number>tile2.getNumber()) % 2 === 0;
   }

   testUnit(): void {
      let dummyDiv = document.createElement("div");
      let t1 = new Tile(dummyDiv);
      let t2 = new Tile(dummyDiv);

      this.#parity = "odd";
      t1.setNumber(1);
      t2.setNumber(3);

      console.assert(this.check(t1, t2) === false); //4

      t2.setNumber(4);
      console.assert(this.check(t1, t2) === true); //5

      this.#parity = "even";

      console.assert(this.check(t1, t2) === false); //5

      t2.setNumber(5);
      console.assert(this.check(t2, t1) === true); //6

      dummyDiv.remove();
   }
}