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
var _RatioOfX_ratio;
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
//# sourceMappingURL=RatioOfX.js.map