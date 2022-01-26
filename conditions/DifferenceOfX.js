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
var _DifferenceOfX_difference;
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
//# sourceMappingURL=DifferenceOfX.js.map