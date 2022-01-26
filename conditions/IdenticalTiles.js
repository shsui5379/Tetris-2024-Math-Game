"use strict";
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
//# sourceMappingURL=IdenticalTiles.js.map