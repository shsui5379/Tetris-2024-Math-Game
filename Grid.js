"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Grid_numRow, _Grid_numCol, _Grid_grid, _Grid_coolDown, _Grid_dropTime;
class Grid {
    /**
     * Constructs a Grid with the given dimensions, and render it on the display
     * @constructor
     *
     * @param {number} row  The number of rows for this Grid
     * @param {number} column  The number of columns for this Grid
     * @param {HTMLDivElement} element  The HTML div element to render this Grid on
     */
    constructor(row, column, element) {
        //Number of rows in a Grid object
        _Grid_numRow.set(this, void 0);
        //Number of columns in a Grid object
        _Grid_numCol.set(this, void 0);
        //2D Tile array representing the Grid object
        _Grid_grid.set(this, void 0);
        //The cooldown before dropping another Tile after a Tile lands in ms
        _Grid_coolDown.set(this, void 0);
        //The time for a Tile to move from one row to another in ms
        _Grid_dropTime.set(this, void 0);
        __classPrivateFieldSet(this, _Grid_numRow, row, "f");
        __classPrivateFieldSet(this, _Grid_numCol, column, "f");
        __classPrivateFieldSet(this, _Grid_grid, [], "f");
        __classPrivateFieldSet(this, _Grid_coolDown, 1000, "f");
        __classPrivateFieldSet(this, _Grid_dropTime, 100, "f");
        this.makeGrid(__classPrivateFieldGet(this, _Grid_numRow, "f"), __classPrivateFieldGet(this, _Grid_numCol, "f"), element);
    }
    //Initializes the 2D Grid object by creating (row * col) Tile objects
    makeGrid(row, col, element) {
        for (let r = 0; r < row; r++) {
            let rowOfTiles = [];
            for (let c = 0; c < col; c++) {
                rowOfTiles.push(new Tile(element));
            }
            __classPrivateFieldGet(this, _Grid_grid, "f").push(rowOfTiles);
            element.appendChild(document.createElement("br"));
        }
    }
    /**
     * Updates the display to reflect the current state of its Tiles
     */
    display() {
        for (let row of __classPrivateFieldGet(this, _Grid_grid, "f")) {
            for (let tile of row) {
                tile.display();
            }
        }
    }
    //Receives user inputs in the form of arrow keys to move Tiles
    mergeTilesRight(condition) {
        console.log("ATTEMPTING TO MERGE RIGHT");
        var grid = __classPrivateFieldGet(this, _Grid_grid, "f");
        var rows = __classPrivateFieldGet(this, _Grid_numRow, "f") - 1;
        var cols = __classPrivateFieldGet(this, _Grid_numCol, "f") - 1;
        for (let r = 0; r <= rows; r++) {
            for (let c = cols; c >= 0; c--) {
                let temp = c;
                while (this.isValidLocation(r, temp) && grid[r][temp].isEmpty()) {
                    temp--;
                }
                //If a non-empty Tile is found, check for merges
                if (this.isValidLocation(r, temp)) {
                    //Before any merges, we will shift the found Tile to the current column
                    if (grid[r][c].isEmpty() && !grid[r][temp].isDropping())
                        grid[r][c].swap(grid[r][temp]);
                    if (this.isValidLocation(r, c + 1)) {
                        if (condition.check(grid[r][c], grid[r][c + 1]) && !grid[r][c].isDropping() && !grid[r][c + 1].isDropping()) {
                            console.log("CONDITION VERIIED");
                            grid[r][c + 1].merge(grid[r][c]);
                            //Merging will leave a gap, so check this column again for more merges
                            c++;
                        }
                    }
                }
            }
        }
        this.dropColumn();
        this.display();
    }
    mergeTilesDown(condition) {
        console.log("ATTEMPTING TO MERGE DOWN");
        var grid = __classPrivateFieldGet(this, _Grid_grid, "f");
        var rows = __classPrivateFieldGet(this, _Grid_numRow, "f") - 1;
        var cols = __classPrivateFieldGet(this, _Grid_numCol, "f") - 1;
        for (let c = 0; c <= cols; c++) {
            for (let r = rows; r >= 0; r--) {
                let temp = r;
                while (this.isValidLocation(temp, c) && grid[temp][c].isEmpty()) {
                    temp--;
                }
                //If a non-empty Tile is found, check for merges
                if (this.isValidLocation(temp, c)) {
                    //Before any merges, we will shift the found Tile to the current row
                    if (grid[r][c].isEmpty() && !grid[temp][c].isDropping())
                        grid[r][c].swap(grid[temp][c]);
                    //Check for a merge
                    if (this.isValidLocation(r + 1, c)) {
                        if (condition.check(grid[r][c], grid[r + 1][c]) && !grid[r][c].isDropping() && !grid[r + 1][c].isDropping()) {
                            grid[r + 1][c].merge(grid[r][c]);
                            //Merging will leave a gap, so check this column again for more merges
                            r++;
                        }
                    }
                }
            }
        }
        this.dropColumn();
        this.display();
    }
    mergeTilesLeft(condition) {
        console.log("ATTEMPTING TO MERGE LEFT");
        var grid = __classPrivateFieldGet(this, _Grid_grid, "f");
        var rows = __classPrivateFieldGet(this, _Grid_numRow, "f") - 1;
        var cols = __classPrivateFieldGet(this, _Grid_numCol, "f") - 1;
        for (let r = 0; r <= rows; r++) {
            for (let c = 0; c <= cols; c++) {
                let temp = c;
                while (this.isValidLocation(r, temp) && grid[r][temp].isEmpty()) {
                    temp++;
                }
                //If a non-empty Tile is found, check for merges
                if (this.isValidLocation(r, temp)) {
                    //Before any merges, we will shift the found Tile to the current column
                    if (grid[r][c].isEmpty() && !grid[r][temp].isDropping())
                        grid[r][c].swap(grid[r][temp]);
                    if (this.isValidLocation(r, c - 1)) {
                        if (condition.check(grid[r][c], grid[r][c - 1]) && !grid[r][c].isDropping() && !grid[r][c - 1].isDropping()) {
                            grid[r][c - 1].merge(grid[r][c]);
                            //Merging will leave a gap, so check this column again for more merges
                            c--;
                        }
                    }
                }
            }
        }
        this.dropColumn();
        this.display();
    }
    //Gravity effect when Tiles are merged
    dropColumn() {
        console.log("dropping column");
        var r = __classPrivateFieldGet(this, _Grid_numRow, "f") - 1;
        var c = __classPrivateFieldGet(this, _Grid_numCol, "f") - 1;
        for (let col = 0; col <= c; col++) {
            for (let row = r; row >= 0; row--) {
                let tempRow = row;
                while (this.moveTileDown(tempRow, col)) {
                    tempRow++;
                }
            }
        }
    }
    //Checks if the current Tile can be moved down
    moveTileDown(tileRow, tileCol) {
        var grid = __classPrivateFieldGet(this, _Grid_grid, "f");
        var validLocation = this.isValidLocation(tileRow + 1, tileCol);
        if (!validLocation)
            return false;
        var empty = grid[tileRow + 1][tileCol].isEmpty();
        console.log("moving tile down");
        if (!empty)
            return false; //Checks if Tile[row+1][col] is out of bounds or empty
        else {
            console.log('preparing to swap tiles');
            grid[tileRow + 1][tileCol].swap(grid[tileRow][tileCol]); //Swaps the current [row][col] with [row+1][col]
            return true;
        }
    }
    dropRandomNumber() {
        var grid = __classPrivateFieldGet(this, _Grid_grid, "f");
        var randomColumn = Math.floor((Math.random() * __classPrivateFieldGet(this, _Grid_numCol, "f"))); //Generates a number in interval [0,this.#numCol-1]
        if ((!grid[0][randomColumn].isEmpty()))
            return false; //If the first row of the chosen column is not empty, the player loses
        else {
            let randomNumber = Math.floor((Math.random() * 3) + 1); //Generates number in interval [1,3]
            let randomColor = Tile.getAvailableColors()[Math.floor((Math.random() * Tile.getAvailableColors().length))]; //Generates a number in interval [0,Tile.availableColors().length-1]
            let randomShape = Tile.getAvailableShapes()[Math.floor((Math.random() * Tile.getAvailableShapes().length))];
            console.log(randomColumn, randomColor, randomNumber);
            //Update the first Tile object in row 1 to the randomly generated Tile properties
            grid[0][randomColumn].setColor(randomColor);
            grid[0][randomColumn].setNumber(randomNumber);
            grid[0][randomColumn].setShape(randomShape);
            grid[0][randomColumn].setDropping(true);
            grid[0][randomColumn].display();
            let currRow = 0;
            let currCol = randomColumn;
            let totalDropTime = this.calculateDropSeconds(currRow + 1, currCol);
            let dropInterval = setInterval(() => {
                if ((!this.moveTileDown(currRow, currCol))) {
                    clearInterval(dropInterval);
                    grid[0][randomColumn].setDropping(false);
                }
                else {
                    this.moveTileDown(currRow, currCol);
                    this.display();
                    currRow++;
                }
            }, this.getDropTime());
            return (__classPrivateFieldGet(this, _Grid_coolDown, "f") + totalDropTime);
        }
    }
    //Calculates the number of seconds for a Tile to touch the ground
    calculateDropSeconds(row, col) {
        var grid = __classPrivateFieldGet(this, _Grid_grid, "f");
        var emptyTileCount = 0;
        var r = row;
        while (this.isValidLocation(r, col) && grid[r][col].isEmpty()) {
            emptyTileCount++;
            r++;
        }
        return (emptyTileCount * this.getDropTime());
    }
    //Checks if a Tile object’s row/col values are out of bounds
    isValidLocation(tileRow, tileCol) {
        return ((tileRow >= 0 && tileRow <= __classPrivateFieldGet(this, _Grid_numRow, "f") - 1) && (tileCol >= 0 && tileCol <= __classPrivateFieldGet(this, _Grid_numCol, "f") - 1));
    }
    //Empties (sets to default values) each Tile object
    clear() {
        var grid = __classPrivateFieldGet(this, _Grid_grid, "f");
        grid.forEach(function (row) {
            row.forEach(function (tile) {
                tile.empty();
            });
        });
        this.display();
    }
    //Setter Method(s)
    setCoolDown(cd) {
        __classPrivateFieldSet(this, _Grid_coolDown, cd, "f");
    }
    setDropTime(dt) {
        __classPrivateFieldSet(this, _Grid_dropTime, dt, "f");
    }
    //Getter Method(s)
    getCoolDown() {
        return __classPrivateFieldGet(this, _Grid_coolDown, "f");
    }
    getDropTime() {
        return __classPrivateFieldGet(this, _Grid_dropTime, "f");
    }
}
_Grid_numRow = new WeakMap(), _Grid_numCol = new WeakMap(), _Grid_grid = new WeakMap(), _Grid_coolDown = new WeakMap(), _Grid_dropTime = new WeakMap();
/*
When the game begins, drop a tile and when it touches the floor,
let the cooldown begin. After the cooldown, keep dropping tile.
*/
//# sourceMappingURL=Grid.js.map