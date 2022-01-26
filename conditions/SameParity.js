"use strict";
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
//# sourceMappingURL=SameParity.js.map