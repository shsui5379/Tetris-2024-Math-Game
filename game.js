"use strict";
var currentCondition;
var grid;
function initializeGame() {
    grid = new Grid(8, 8, document.getElementById('grid'));
    grid.display();
    grid.dropRandomNumber();
}
//# sourceMappingURL=game.js.map