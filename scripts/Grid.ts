//An interface used to update user's score
interface MergedData{
    "counter": number;
    "mergedValues": number[];
}

class Grid {
    //Number of rows in a Grid object
    #numRow: number;

    //Number of columns in a Grid object
    #numCol: number;

    //2D Tile array representing the Grid object
    #grid: Tile[][];

    //The cooldown before dropping another Tile after a Tile lands in ms
    #coolDown: number;

    //The time for a Tile to move from one row to another in ms
    #dropTime: number;

    //The highest merge streak [optional]
    // #mergeStreak: number;

    //The bonus (in percentage) applied to a user's score based on merge streak 
    #bonusScoreRate: number;

    #dropInterval: Interval;

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
        this.#coolDown = 1000;
        this.#dropTime = 100;
        this.#bonusScoreRate = 1.0

        this.makeGrid(this.#numRow, this.#numCol, element);
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

    //Receives user inputs in the form of arrow keys to move Tiles
    mergeTilesRight(condition: MergeCondition): MergedData {
        var grid = this.#grid;
        var rows = this.#numRow - 1;
        var cols = this.#numCol - 1;
        let counter = 0;
        let mergedValues: number[] = [];
        for (let r = 0; r <= rows; r++) {
            for (let c = cols; c >= 0; c--) {
                let temp = c;
                while (this.isValidLocation(r, temp) && (grid[r][temp].isEmpty() || grid[r][temp].isDropping())) {
                    temp--;
                }

                //If a non-empty Tile is found, check for merges
                if (this.isValidLocation(r, temp)) {
                    //Before any merges, we will shift the found Tile to the current column
                    if (grid[r][c].isEmpty() && !grid[r][temp].isDropping()) grid[r][c].swap(grid[r][temp]);
                    if (this.isValidLocation(r, c + 1)) {
                        if (condition.check(grid[r][c], grid[r][c + 1]) && !grid[r][c].isDropping() && !grid[r][c + 1].isDropping()) {
                            grid[r][c + 1].merge(grid[r][c]);
                            counter++;
                            mergedValues.push(grid[r][c + 1].getNumber() || 0);
                            //Merging will leave a gap, so check this column again for more merges
                            c++;
                        }
                    }
                }
            }
        }
        this.dropColumn();
        this.display();
        let mergedData: MergedData = {
            "counter": 0,
            "mergedValues": []
        };
        mergedData['counter'] = counter;
        mergedData['mergedValues'] = mergedValues;

        return mergedData;
    }

    mergeTilesDown(condition: MergeCondition): MergedData {
        var grid = this.#grid;
        var rows = this.#numRow - 1;
        var cols = this.#numCol - 1;
        let counter = 0;
        let mergedValues: number[] = [];
        for (let c = 0; c <= cols; c++) {
            for (let r = rows; r >= 0; r--) {
                let temp = r;
                while (this.isValidLocation(temp, c) && (grid[temp][c].isEmpty() || grid[temp][c].isDropping())) {
                    temp--;
                }

                //If a non-empty Tile is found, check for merges
                if (this.isValidLocation(temp, c)) {
                    //Before any merges, we will shift the found Tile to the current row
                    if (grid[r][c].isEmpty() && !grid[temp][c].isDropping()) grid[r][c].swap(grid[temp][c]);

                    //Check for a merge
                    if (this.isValidLocation(r + 1, c)) {
                        if (condition.check(grid[r][c], grid[r + 1][c]) && !grid[r][c].isDropping() && !grid[r + 1][c].isDropping()) {
                            grid[r + 1][c].merge(grid[r][c]);
                            counter++;
                            mergedValues.push(grid[r + 1][c].getNumber() || 0);
                            //Merging will leave a gap, so check this column again for more merges
                            r++;
                        }
                    }
                }
            }
        }
        this.dropColumn();
        this.display();

        let mergedData: MergedData = {
            "counter": 0,
            "mergedValues": []
        };
        mergedData['counter'] = counter;
        mergedData['mergedValues'] = mergedValues;

        return mergedData;
    }

    mergeTilesLeft(condition: MergeCondition): MergedData {
        var grid = this.#grid;
        var rows = this.#numRow - 1;
        var cols = this.#numCol - 1;
        let counter = 0;
        let mergedValues: number[] = [];
        for (let r = 0; r <= rows; r++) {
            for (let c = 0; c <= cols; c++) {
                let temp = c;
                while (this.isValidLocation(r, temp) && (grid[r][temp].isEmpty() || grid[r][temp].isDropping())) {
                    temp++;
                }

                //If a non-empty Tile is found, check for merges
                if (this.isValidLocation(r, temp)) {
                    //Before any merges, we will shift the found Tile to the current column
                    if (grid[r][c].isEmpty() && !grid[r][temp].isDropping()) grid[r][c].swap(grid[r][temp]);
                    if (this.isValidLocation(r, c - 1)) {
                        if (condition.check(grid[r][c], grid[r][c - 1]) && !grid[r][c].isDropping() && !grid[r][c - 1].isDropping()) {
                            grid[r][c - 1].merge(grid[r][c]);
                            counter++;
                            mergedValues.push(grid[r][c-1].getNumber() || 0);
                            
                            //Merging will leave a gap, so check this column again for more merges
                            c--;
                        }
                    }
                }
            }
        }
        this.dropColumn();
        this.display();

        let mergedData: MergedData = {
            "counter": 0,
            "mergedValues": []
        };
        mergedData['counter'] = counter;
        mergedData['mergedValues'] = mergedValues;

        return mergedData;
    }

    //Gravity effect when Tiles are merged
    dropColumn() {
        var r = this.#numRow - 1;
        var c = this.#numCol - 1;
        for (let col = 0; col <= c; col++) {
            for (let row = r; row >= 0; row--) {
                if (!this.#grid[row][col].isDropping()) {
                    let tempRow = row;
                    while (this.moveTileDown(tempRow, col)) {
                        tempRow++;
                    }
                }
            }
        }
    }

    //Checks if the current Tile can be moved down
    moveTileDown(tileRow: number, tileCol: number): boolean {
        var grid = this.#grid;
        var validLocation = this.isValidLocation(tileRow + 1, tileCol);
        if (!validLocation) return false;
        var empty = grid[tileRow + 1][tileCol].isEmpty();

        if (!empty) return false;       //Checks if Tile[row+1][col] is out of bounds or empty
        else {
            grid[tileRow + 1][tileCol].swap(grid[tileRow][tileCol]);  //Swaps the current [row][col] with [row+1][col]
            return true;
        }
    }

    dropRandomNumber(): (boolean | number) {
        var grid = this.#grid;
        var randomColumn = Math.floor((Math.random() * this.#numCol)); //Generates a number in interval [0,this.#numCol-1]

        if ((!grid[0][randomColumn].isEmpty())) return false;   //If the first row of the chosen column is not empty, the player loses
        else {
            let randomNumber = Math.floor((Math.random() * 5) + 1); //Generates number in interval [1,5]
            let randomColor = Tile.getAvailableColors()[Math.floor((Math.random() * Tile.getAvailableColors().length))]; //Generates a number in interval [0,Tile.availableColors().length-1]
            let randomShape = Tile.getAvailableShapes()[Math.floor((Math.random() * Tile.getAvailableShapes().length))];

            //Update the first Tile object in row 1 to the randomly generated Tile properties
            grid[0][randomColumn].setColor(randomColor);
            grid[0][randomColumn].setNumber(randomNumber);
            grid[0][randomColumn].setShape(randomShape);
            grid[0][randomColumn].setDropping(true);
            grid[0][randomColumn].display();

            let currRow = 0;
            let currCol = randomColumn;
            let totalDropTime = this.calculateDropSeconds(currRow + 1, currCol);

            let dropInterval = new Interval(() => {
                if ((!this.moveTileDown(currRow, currCol))) {
                    dropInterval.clear();
                    grid[currRow][currCol].setDropping(false);
                }
                else {
                    this.moveTileDown(currRow, currCol);
                    this.display();
                    currRow++;
                }
            }, this.getDropTime());

            this.#dropInterval = dropInterval;

            return (this.#coolDown + totalDropTime);
        }
    }

    //Calculates the number of seconds for a Tile to touch the ground
    calculateDropSeconds(row: number, col: number): number {
        var grid = this.#grid;
        var emptyTileCount = 0;
        var r = row;
        while (this.isValidLocation(r, col) && grid[r][col].isEmpty()) {
            emptyTileCount++;
            r++;
        }

        return (emptyTileCount * this.getDropTime());
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

    pauseDrop(): void {
        this.#dropInterval.pause();
    }

    resumeDrop(): void {
        this.#dropInterval.resume();
    }

    //Setter Method(s)
    setCoolDown(cd: number): void {
        this.#coolDown = cd;
    }

    setDropTime(dt: number): void {
        this.#dropTime = dt;
    }

    // setMergeStreak(ms: number): void{
    //     this.#mergeStreak = ms;
    // }

    setBonusScoreRate(bsr: number): void{
        this.#bonusScoreRate = bsr;
    }

    //Getter Method(s)
    getCoolDown(): number {
        return this.#coolDown;
    }

    getDropTime(): number {
        return this.#dropTime;
    }

    // getMergeStreak(): number{
    //     return this.#mergeStreak;
    // }

    getBonusScoreRate(): number{
        return this.#bonusScoreRate;
    }
}
/*
When the game begins, drop a tile and when it touches the floor,
let the cooldown begin. After the cooldown, keep dropping tile.
*/