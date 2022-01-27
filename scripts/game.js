"use strict";
let currentCondition;
let grid;
let score;
let ongoing;
let paused;
let currentTimeout;
let touchX;
let touchY;
let pausedByButton = false;
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
    //autopause
    window.addEventListener("blur", function () { togglePause(false); });
    window.addEventListener("focus", function () { togglePause(false); });
    //scoreboard stuff
    if (!localStorage.getItem("highscore")) {
        localStorage.setItem("highscore", score.toString());
    }
    displayScore(score, parseInt(localStorage.getItem("highscore")));
}
function startGame() {
    score = 0;
    ongoing = true;
    paused = false;
    document.getElementById("pause").innerText = "Pause";
    changeCondition();
    configureDropInterval();
}
/**
 * Ends the current game, and starts a new one
 */
function reset() {
    if (confirm("Are you sure you want to start a new game?")) {
        console.log("user consented to restart");
        currentTimeout.clear();
        grid.clear();
        score = 0;
        gameOver();
        startGame();
    }
}
/**
 * Handles keypresses
 * @param {KeyboardEvent} e Details on the keypress
 */
function keyHandler(e) {
    if (ongoing && !paused) {
        if (e.key == "ArrowDown") {
            let mergeData = grid.mergeTilesDown(currentCondition);
            if (mergeData.counter > 0) {
                changeCondition();
                updateScore(mergeData);
                displayScore(score, parseInt(localStorage.getItem('highscore')));
            }
            else {
                grid.setBonusScoreRate(1.0);
            }
        }
        else if (e.key == "ArrowLeft") {
            let mergeData = grid.mergeTilesLeft(currentCondition);
            if (mergeData.counter > 0) {
                changeCondition();
                updateScore(mergeData);
                displayScore(score, parseInt(localStorage.getItem('highscore')));
            }
            else {
                grid.setBonusScoreRate(1.0);
            }
        }
        else if (e.key == "ArrowRight") {
            let mergeData = grid.mergeTilesRight(currentCondition);
            if (mergeData.counter > 0) {
                changeCondition();
                updateScore(mergeData);
                displayScore(score, parseInt(localStorage.getItem('highscore')));
            }
            else {
                grid.setBonusScoreRate(1.0);
            }
        }
    }
}
/**
 *
 * @param {MergedData} Updates score using data obtained from merged Tiles
 */
function updateScore(mergedData) {
    let numberOfMerges = mergedData.counter;
    let mergedValues = mergedData.mergedValues;
    for (let i = 1; i <= numberOfMerges; i++) {
        let newBonusRate = Math.floor(grid.getBonusScoreRate() * 1.10);
        grid.setBonusScoreRate(newBonusRate);
        score += grid.getBonusScoreRate() * (mergedValues.shift() || 1);
    }
}
/**
 * Handles swipes
 *
 * inspiration: https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android
 * @param {TouchEvent} e Details on the touch
 */
function swipeHandler(e) {
    if (ongoing && !paused) {
        if (e.type == "touchstart") {
            touchX = e.touches[0].clientX;
            touchY = e.touches[0].clientY;
        }
        else if (e.type == "touchend") {
            let xDiff = e.changedTouches[0].clientX - touchX;
            let yDiff = e.changedTouches[0].clientY - touchY;
            if (Math.abs(xDiff) > Math.abs(yDiff)) { //horizontal swipe
                if (xDiff > 0) {
                    let mergeData = grid.mergeTilesRight(currentCondition);
                    if (mergeData.counter > 0) {
                        changeCondition();
                        updateScore(mergeData);
                        displayScore(score, parseInt(localStorage.getItem('highscore')));
                    }
                    else {
                        grid.setBonusScoreRate(1.0);
                    }
                }
                else {
                    let mergeData = grid.mergeTilesLeft(currentCondition);
                    if (mergeData.counter > 0) {
                        changeCondition();
                        updateScore(mergeData);
                        displayScore(score, parseInt(localStorage.getItem('highscore')));
                    }
                    else {
                        grid.setBonusScoreRate(1.0);
                    }
                }
            }
            else {
                if (yDiff > 0) {
                    let mergeData = grid.mergeTilesDown(currentCondition);
                    if (mergeData.counter > 0) {
                        changeCondition();
                        updateScore(mergeData);
                        displayScore(score, parseInt(localStorage.getItem('highscore')));
                    }
                    else {
                        grid.setBonusScoreRate(1.0);
                    }
                }
            }
        }
    }
}
/**
 * Changes the current merge condition
 */
function changeCondition() {
    currentCondition = possibleConditions[Math.floor(Math.random() * possibleConditions.length)];
    currentCondition.randomizeParameters();
    printOnMessageBoard(currentCondition.toString());
}
/**
 * Prints a message on the message board
 * @param {string} message The message to print
 */
function printOnMessageBoard(message) {
    document.getElementById("condition").innerText = message;
}
/**
 * Displays scores on the scoreboard
 * @param {number} current The current score
 * @param {number} highscore The high score
 */
function displayScore(current, highscore) {
    document.getElementById("score").innerText = current.toString();
    document.getElementById("highscore").innerText = highscore.toString();
}
function configureDropInterval() {
    var delay = grid.dropRandomNumber(); //The first Tile dropped should not have a cooldown
    if (delay === false)
        gameOver();
    dropInterval(delay);
}
function dropInterval(delay) {
    currentTimeout = new Timeout(() => {
        delay = grid.dropRandomNumber();
        if (delay === false) {
            gameOver();
        }
        else {
            dropInterval(delay);
        }
    }, delay);
}
function gameOver() {
    ongoing = false;
    printOnMessageBoard("Game over");
    if (score > parseInt(localStorage.getItem("highscore"))) {
        localStorage.setItem("highscore", score.toString());
    }
    displayScore(score, parseInt(localStorage.getItem("highscore")));
}
/**
 * Opens instructions.html in a new tab
 */
function openInstructions() {
    open("instructions.html", "_blank");
}
/**
 * Toggles the pause state of the game
 *
 * @param {boolean} userPaused  True if the pause was manually requested by user
 */
function togglePause(userPaused) {
    if (ongoing) {
        if (paused) { //resume
            if (userPaused && pausedByButton || !pausedByButton) { //manual pause require manual unpause
                paused = false;
                printOnMessageBoard(currentCondition.toString());
                document.getElementById("pause").innerText = "Pause";
                currentTimeout.resume();
                grid.resumeDrop();
            }
        }
        else { //pause
            pausedByButton = userPaused;
            paused = true;
            printOnMessageBoard("Paused");
            document.getElementById("pause").innerText = "Resume";
            currentTimeout.pause();
            grid.pauseDrop();
        }
    }
}
//# sourceMappingURL=game.js.map