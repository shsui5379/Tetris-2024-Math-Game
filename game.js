"use strict";
let currentCondition;
let grid;
let score;
let ongoing;
/**
 * Sets up the page
 */
function initializeGame() {
    //set up the grid
    grid = new Grid(8, 8, (document.getElementById("grid")));
    startGame();
    //scoreboard stuff
    if (!localStorage.getItem("highscore")) {
        localStorage.setItem("highscore", score.toString());
    }
}
function startGame() {
    score = 0;
    ongoing = true;
    grid.dropRandomNumber();
}
function reset() {
    if (confirm("Are you sure you want to start a new game?")) {
    }
}
//# sourceMappingURL=game.js.map