let grid: Grid;

/**
 * Sets up the page
 */
function initializeGame(): void {
   grid = new Grid(8, 8, <HTMLDivElement>(document.getElementById("grid")));
}