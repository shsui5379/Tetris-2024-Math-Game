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
var _SumToParity_parity, _SumToPrimality_primality;
var possibleConditions = [];
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
}
_SumToPrimality_primality = new WeakMap();
possibleConditions.push(new SumToPrimality());
//# sourceMappingURL=MergeCondition.js.map