class Grid {
    //Number of rows in a Grid object
    #numRow: number;

    //Number of columns in a Grid object
    #numCol: number;

    //2D Tile array representing the Grid object
    #grid: Tile[][];

    //Test
    #coolDown: number;

    /**
     * Constructs a Grid with the given dimensions, and render it on the display
     * @constructor
     * 
     * @param {number} row  The number of rows for this Grid
     * @param {number} column  The number of columns for this Grid
     * @param {HTMLDivElement} element  The HTML div element to render this Grid on
     */
    constructor(row: number, column: number, element: HTMLDivElement) {
        this.#numRow = row;
        this.#numCol = column;
        this.#grid = [];
        this.#coolDown = 3;

        this.makeGrid(this.#numRow, this.#numCol, element);

        console.log(this.#grid);
    }

    //Initializes the 2D Grid object by creating (row * col) Tile objects
    makeGrid(row: number, col: number, element: HTMLDivElement): void {
        for (let r = 0; r < row; r++) {
            let rowOfTiles: Tile[] = [];

            for (let c = 0; c < col; c++) {
                rowOfTiles.push(new Tile(element));
            }

            this.#grid.push(rowOfTiles);

            element.appendChild(document.createElement("br"));
        }
    }

    /**
     * Updates the display to reflect the current state of its Tiles
     */
    display(): void {
        for (let row of this.#grid) {
            for (let tile of row) {
                tile.display();
            }
        }
    }

    //Checks if the current Tile can be moved down
    moveTileDown(tileRow: number, tileCol: number): boolean {
        var grid = this.#grid;
        var validLocation = this.isValidLocation(tileRow + 1, tileCol);
        if (!validLocation) return false;
        var empty = grid[tileRow + 1][tileCol].isEmpty();

        // console.log("the next tile is a valid location: " + validLocation);
        // console.log("the next tile is empty: " + empty);
        console.log("moving tile down");
        if (!empty) return false;       //Checks if Tile[row+1][col] is out of bounds or empty
        else {
            console.log('preparing to swap tiles');
            grid[tileRow + 1][tileCol].swap(grid[tileRow][tileCol]);  //Swaps the current [row][col] with [row+1][col]
            return true;
        }
    }

    //Checks if the current Tile can be merged right
    mergeTileRight(tileRow: number, tileCol: number): boolean {
        return false;
    }

    mergeTilesDown(condition: MergeCondition): number { return 0; }

    mergeTilesLeft(condition: MergeCondition): number { return 0; }

    mergeTilesRight(condition: MergeCondition): number { return 0; }

    dropRandomNumber(): boolean {
        var grid = this.#grid;
        var randomColumn = Math.floor((Math.random() * this.#numCol)); //Generates a number in interval [0,this.#numCol-1]

        if ((!grid[0][randomColumn].isEmpty())) return false;   //If the first row of the chosen column is not empty, the player loses
        else {
            let randomNumber = Math.floor((Math.random() * 3) + 1); //Generates number in interval [1,3]
            let randomColor = Tile.getAvailableColors()[Math.floor((Math.random() * Tile.getAvailableColors().length))]; //Generates a number in interval [0,Tile.availableColors().length-1]
            let randomShape = Tile.getAvailableShapes()[Math.floor((Math.random() * Tile.getAvailableShapes().length))];

            console.log(randomColumn, randomColor, randomNumber);
            //Update the first Tile object in row 1 to the randomly generated Tile properties
            grid[0][randomColumn].setColor(randomColor as Color);
            grid[0][randomColumn].setNumber(randomNumber);
            grid[0][randomColumn].setShape(randomShape);
            grid[0][randomColumn].display();

            //Begin to drop the Tile object starting at the next row 
            let currRow = 0;
            let currCol = randomColumn;
            let dropInterval = setInterval(() => {
                console.log("testing drop interval with row: " + currRow);
                if ((!this.moveTileDown(currRow, currCol))) {
                    console.log("interval is cleared");
                    setTimeout(() => this.dropRandomNumber(), 3000);
                    clearInterval(dropInterval);
                }
                else {
                    this.moveTileDown(currRow, currCol);
                    this.display();
                    currRow++;
                }
            }, 1000);

            return true;
        }
    }

    //Checks if a Tile object’s row/col values are out of bounds
    isValidLocation(tileRow: number, tileCol: number): boolean {
        return ((tileRow >= 0 && tileRow <= this.#numRow - 1) && (tileCol >= 0 && tileCol <= this.#numCol - 1));
    }

    //Empties (sets to default values) each Tile object
    clear(): void {
        var grid = this.#grid;
        grid.forEach(function (row: Tile[]): void {
            row.forEach(function (tile: Tile): void {
                tile.empty();
            });
        });
        this.display();
    }
}
    /*
When the game begins, drop a tile and when it touches the floor,
let the cooldown begin. After the cooldown, keep dropping tile.
*/
