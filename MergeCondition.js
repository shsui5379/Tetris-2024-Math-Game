"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _SumToPrimeNumber_value, _SumToPrimeNumber_parity;
var possibleConditions = [];
class SumToPrimeNumber {
    constructor() {
        _SumToPrimeNumber_value.set(this, void 0);
        _SumToPrimeNumber_parity.set(this, void 0);
        this.randomizeParameters();
    }
    toString() { /* implement */ return ""; }
    randomizeParameters() {
        //Testing
        __classPrivateFieldSet(this, _SumToPrimeNumber_value, 1, "f");
        __classPrivateFieldSet(this, _SumToPrimeNumber_parity, "odd", "f");
    }
    check(tile1, tile2) { /* implement */ return true; }
    someHelperMethod() { /* implement */ return -1; }
}
_SumToPrimeNumber_value = new WeakMap(), _SumToPrimeNumber_parity = new WeakMap();
possibleConditions.push(new SumToPrimeNumber());
//Test
console.log(possibleConditions[0]);
//# sourceMappingURL=MergeCondition.js.map