"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _SumToParity_parity, _SumToPrimality_primality, _DifferenceOfX_difference, _RatioOfX_ratio;
var possibleConditions = [];
function testConditions() {
    for (let condition of possibleConditions) {
        condition.testUnit();
    }
}
class SumToParity {
    constructor() {
        _SumToParity_parity.set(this, void 0);
        this.randomizeParameters();
    }
    toString() {
        return "Numbers that sum to an " + __classPrivateFieldGet(this, _SumToParity_parity, "f") + " number";
    }
    randomizeParameters() {
        __classPrivateFieldSet(this, _SumToParity_parity, (Math.random() < 0.5) ? "odd" : "even", "f");
    }
    check(tile1, tile2) {
        return __classPrivateFieldGet(this, _SumToParity_parity, "f") === "odd" && (tile1.getNumber() + tile2.getNumber()) % 2 === 1 || __classPrivateFieldGet(this, _SumToParity_parity, "f") === "even" && (tile1.getNumber() + tile2.getNumber()) % 2 === 0;
    }
    testUnit() {
        let dummyDiv = document.createElement("div");
        let t1 = new Tile(dummyDiv);
        let t2 = new Tile(dummyDiv);
        __classPrivateFieldSet(this, _SumToParity_parity, "odd", "f");
        t1.setNumber(1);
        t2.setNumber(3);
        console.assert(this.check(t1, t2) === false); //4
        t2.setNumber(4);
        console.assert(this.check(t1, t2) === true); //5
        __classPrivateFieldSet(this, _SumToParity_parity, "even", "f");
        console.assert(this.check(t1, t2) === false); //5
        t2.setNumber(5);
        console.assert(this.check(t2, t1) === true); //6
        dummyDiv.remove();
    }
}
_SumToParity_parity = new WeakMap();
possibleConditions.push(new SumToParity());
class SumToPrimality {
    constructor() {
        _SumToPrimality_primality.set(this, void 0);
        this.randomizeParameters();
    }
    toString() {
        return "Numbers that sum to a " + __classPrivateFieldGet(this, _SumToPrimality_primality, "f") + " number";
    }
    randomizeParameters() {
        __classPrivateFieldSet(this, _SumToPrimality_primality, (Math.random() < 0.5) ? "prime" : "composite", "f");
    }
    check(tile1, tile2) {
        return __classPrivateFieldGet(this, _SumToPrimality_primality, "f") === "prime" && isPrime(tile1.getNumber() + tile2.getNumber()) || __classPrivateFieldGet(this, _SumToPrimality_primality, "f") === "composite" && !isPrime(tile1.getNumber() + tile2.getNumber());
    }
    testUnit() {
        let dummyDiv = document.createElement("div");
        let t1 = new Tile(dummyDiv);
        let t2 = new Tile(dummyDiv);
        __classPrivateFieldSet(this, _SumToPrimality_primality, "prime", "f");
        t1.setNumber(1);
        t2.setNumber(3);
        console.assert(this.check(t1, t2) === false); //4
        t2.setNumber(1);
        console.assert(this.check(t2, t1) === true); //2
        t1.setNumber(0);
        console.assert(this.check(t1, t2) === false); //1
        t2.setNumber(0);
        console.assert(this.check(t2, t1) === false); //0
        __classPrivateFieldSet(this, _SumToPrimality_primality, "composite", "f");
        t2.setNumber(3);
        console.assert(this.check(t2, t1) === false); //3
        t1.setNumber(5);
        console.assert(this.check(t1, t2) === true); //8
        dummyDiv.remove();
    }
}
_SumToPrimality_primality = new WeakMap();
possibleConditions.push(new SumToPrimality());
class IdenticalTiles {
    constructor() { }
    toString() {
        return "Tiles with the same number, color and shape";
    }
    randomizeParameters() { }
    check(tile1, tile2) {
        return tile1.getColor() === tile2.getColor() && tile1.getShape() === tile2.getShape() && tile1.getNumber() === tile2.getNumber();
    }
    testUnit() {
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
class DifferenceOfX {
    constructor() {
        _DifferenceOfX_difference.set(this, void 0);
        this.randomizeParameters();
    }
    toString() {
        return "Numbers with a difference of " + __classPrivateFieldGet(this, _DifferenceOfX_difference, "f");
    }
    randomizeParameters() {
        __classPrivateFieldSet(this, _DifferenceOfX_difference, randomInteger(1, 3), "f");
    }
    check(tile1, tile2) {
        return Math.abs(tile1.getNumber() - tile2.getNumber()) === __classPrivateFieldGet(this, _DifferenceOfX_difference, "f");
    }
    testUnit() {
        let dummyDiv = document.createElement("div");
        let t1 = new Tile(dummyDiv);
        let t2 = new Tile(dummyDiv);
        __classPrivateFieldSet(this, _DifferenceOfX_difference, 2, "f");
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
_DifferenceOfX_difference = new WeakMap();
possibleConditions.push(new DifferenceOfX());
class RatioOfX {
    constructor() {
        _RatioOfX_ratio.set(this, void 0);
        this.randomizeParameters();
    }
    toString() {
        return "Numbers with a ratio of " + __classPrivateFieldGet(this, _RatioOfX_ratio, "f");
    }
    randomizeParameters() {
        __classPrivateFieldSet(this, _RatioOfX_ratio, randomInteger(1, 3), "f");
    }
    check(tile1, tile2) {
        return tile1.getNumber() / tile2.getNumber() === __classPrivateFieldGet(this, _RatioOfX_ratio, "f") || tile2.getNumber() / tile1.getNumber() === __classPrivateFieldGet(this, _RatioOfX_ratio, "f");
    }
    testUnit() {
        let dummyDiv = document.createElement("div");
        let t1 = new Tile(dummyDiv);
        let t2 = new Tile(dummyDiv);
        __classPrivateFieldSet(this, _RatioOfX_ratio, 2, "f");
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
_RatioOfX_ratio = new WeakMap();
possibleConditions.push(new RatioOfX());
class SameParity {
    constructor() { }
    toString() {
        return "Numbers with the same parity";
    }
    randomizeParameters() { }
    check(tile1, tile2) {
        return (tile1.getNumber() + tile2.getNumber()) % 2 === 0;
    }
    testUnit() {
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
//# sourceMappingURL=MergeCondition.js.map