class SumToPrimality implements MergeCondition {
   #primality: "prime" | "composite";

   constructor() {
      this.randomizeParameters();
   }

   toString(): string {
      return "Numbers that sum to a " + this.#primality + " number";
   }

   randomizeParameters(): void {
      this.#primality = (Math.random() < 0.5) ? "prime" : "composite";
   }

   check(tile1: Tile, tile2: Tile): boolean {
      return this.#primality === "prime" && isPrime(<number>tile1.getNumber() + <number>tile2.getNumber()) || this.#primality === "composite" && !isPrime(<number>tile1.getNumber() + <number>tile2.getNumber());
   }

   testUnit(): void {
      let dummyDiv = document.createElement("div");
      let t1 = new Tile(dummyDiv);
      let t2 = new Tile(dummyDiv);

      this.#primality = "prime";
      t1.setNumber(1);
      t2.setNumber(3);

      console.assert(this.check(t1, t2) === false); //4

      t2.setNumber(1);
      console.assert(this.check(t2, t1) === true); //2

      t1.setNumber(0);
      console.assert(this.check(t1, t2) === false); //1

      t2.setNumber(0);
      console.assert(this.check(t2, t1) === false); //0


      this.#primality = "composite";

      t2.setNumber(3);
      console.assert(this.check(t2, t1) === false); //3

      t1.setNumber(5);
      console.assert(this.check(t1, t2) === true); //8

      dummyDiv.remove();
   }
}