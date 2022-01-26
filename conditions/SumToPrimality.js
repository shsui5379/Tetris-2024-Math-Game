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
var _SumToPrimality_primality;
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
//# sourceMappingURL=SumToPrimality.js.map