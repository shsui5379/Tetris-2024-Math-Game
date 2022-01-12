var currentCondition: MergeCondition;
var grid: Grid;

function initializeGame(): void{
    grid = new Grid(8, 8, <HTMLDivElement>document.getElementById('grid'));
    grid.display();
    startGame();
}

/*
    To implement the cooldown, the first Tile dropped must not have any delay.
    Subsequent tiles will have the cooldown in effect.
*/
function startGame(): void{
    configureDropInterval();
}

function configureDropInterval(): void{
    var delay = grid.dropRandomNumber(); //The first Tile dropped should not have a cooldown
    if (delay === false) gameOver();

    var intervalID = setInterval(() => {
        delay = grid.dropRandomNumber();
        if (delay === false){
            gameOver();
            clearInterval(intervalID);
        }
    }, <number>delay);
}

function gameOver(): void{
    displayMessage("nob");
}

function displayMessage(message: string): string{
    //Some message
    return "";
}