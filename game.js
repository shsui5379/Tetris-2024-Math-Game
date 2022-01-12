"use strict";
let currentCondition;
let grid;
/**
 * Sets up the page
 */
function initializeGame() {
    grid = new Grid(8, 8, (document.getElementById("grid")));
    startGame();
}
function startGame() {
    grid.dropRandomNumber();
}
//# sourceMappingURL=game.js.map