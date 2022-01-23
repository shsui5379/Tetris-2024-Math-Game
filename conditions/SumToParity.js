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
var _SumToParity_parity;
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
//# sourceMappingURL=SumToParity.js.map