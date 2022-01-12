"use strict";
let currentCondition;
let grid;
let score;
let ongoing;
let touchX;
let touchY;
/**
 * Sets up the page
 */
function initializeGame() {
    //set up the grid
    grid = new Grid(8, 8, (document.getElementById("grid")));
    startGame();
    //touch event
    window.addEventListener("touchstart", swipeHandler);
    window.addEventListener("touchend", swipeHandler);
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
/**
 * Ends the current game, and starts a new one
 */
function reset() {
    if (confirm("Are you sure you want to start a new game?")) {
        console.log("user consented to restart");
    }
}
/**
 * Handles keypresses
 * @param {KeyboardEvent} e Details on the keypress
 */
function keyHandler(e) {
    if (e.key == "ArrowDown") {
        console.log("down key pressed");
    }
    else if (e.key == "ArrowLeft") {
        console.log("left key pressed");
    }
    else if (e.key == "ArrowRight") {
        console.log("right key pressed");
    }
}
/**
 * Handles swipes
 * @param {TouchEvent} e Details on the touch
 */
function swipeHandler(e) {
    if (e.type == "touchstart") {
        touchX = e.touches[0].clientX;
        touchY = e.touches[0].clientY;
    }
    else if (e.type == "touchend") {
        let xDiff = e.changedTouches[0].clientX - touchX;
        let yDiff = e.changedTouches[0].clientY - touchY;
        if (Math.abs(xDiff) > Math.abs(yDiff)) { //horizontal swipe
            if (xDiff > 0) {
                console.log("swiped right");
            }
            else {
                console.log("swiped left");
            }
        }
        else {
            if (yDiff > 0) {
                console.log("swiped down");
            }
        }
    }
}
//# sourceMappingURL=game.js.map