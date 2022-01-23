interface MergeCondition {
    check(tile1: Tile, tile2: Tile): boolean;
    toString(): string;
    randomizeParameters(): void;
}

var possibleConditions: MergeCondition[] = [];

class SumToParity implements MergeCondition {
    #parity: string;

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
}
possibleConditions.push(new SumToParity());

class SumToPrimality implements MergeCondition {
    #primality: string;

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
}
possibleConditions.push(new SameParity());