interface MergeCondition {
    check(tile1: Tile, tile2: Tile): boolean;
    toString(): string;
    randomizeParameters(): void;
    testUnit(): void;
}

var possibleConditions: MergeCondition[] = [];

function testConditions(): void {
    for (let condition of possibleConditions) {
        condition.testUnit();
    }
}

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
possibleConditions.push(new SumToParity());

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
possibleConditions.push(new SumToPrimality());

class IdenticalTiles implements MergeCondition {
    constructor() { }

    toString(): string {
        return "Tiles with the same number, color and shape";
    }

    randomizeParameters(): void { }

    check(tile1: Tile, tile2: Tile): boolean {
        return tile1.getColor() === tile2.getColor() && tile1.getShape() === tile2.getShape() && tile1.getNumber() === tile2.getNumber();
    }

    testUnit(): void {
        let dummyDiv = document.createElement("div");
        let t1 = new Tile(dummyDiv);
        let t2 = new Tile(dummyDiv);

        t1.setNumber(1);
        t2.setNumber(3);

        console.assert(this.check(t1, t2) === false); //square, #000000, 1 && square, #000000, 3

        t1.setNumber(3);
        console.assert(this.check(t2, t1) === true); //square, #000000, 3 && square, #000000, 3

        t1.setColor("#2196F3");
        console.assert(this.check(t1, t2) === false); //square, #2196F3, 3 && square, #000000, 3

        dummyDiv.remove();
    }
}
possibleConditions.push(new IdenticalTiles());

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
possibleConditions.push(new DifferenceOfX());

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
possibleConditions.push(new RatioOfX());

class SameParity implements MergeCondition {
    constructor() { }

    toString(): string {
        return "Numbers with the same parity";
    }

    randomizeParameters(): void { }

    check(tile1: Tile, tile2: Tile): boolean {
        return (<number>tile1.getNumber() + <number>tile2.getNumber()) % 2 === 0;
    }

    testUnit(): void {
        let dummyDiv = document.createElement("div");
        let t1 = new Tile(dummyDiv);
        let t2 = new Tile(dummyDiv);

        t1.setNumber(1);
        t2.setNumber(3);

        console.assert(this.check(t1, t2) === true); //1, 3

        t1.setNumber(2);
        console.assert(this.check(t2, t1) === false); //2, 3

        t2.setNumber(4);
        console.assert(this.check(t1, t2) === true); //2, 4

        dummyDiv.remove();
    }
}
possibleConditions.push(new SameParity());