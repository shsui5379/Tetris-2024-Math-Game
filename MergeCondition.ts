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
