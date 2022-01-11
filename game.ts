var currentCondition: MergeCondition;
var grid: Grid;

function initializeGame(): void{
    grid = new Grid(8, 8, <HTMLDivElement>document.getElementById('grid'));
    grid.display();
    grid.dropRandomNumber();
    
}
