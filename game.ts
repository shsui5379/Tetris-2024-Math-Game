let currentCondition: MergeCondition;
let grid: Grid;
let score: number;
let ongoing: boolean;

/**
 * Sets up the page
 */
function initializeGame(): void {
    //set up the grid
    grid = new Grid(8, 8, <HTMLDivElement>(document.getElementById("grid")));
    startGame();

    //scoreboard stuff
    if (!localStorage.getItem("highscore")) {
        localStorage.setItem("highscore", score.toString());
    }
}

function startGame(): void {
    score = 0;
    ongoing = true;
    grid.dropRandomNumber();
}

function reset(): void {
    if (confirm("Are you sure you want to start a new game?")) {

    }
}