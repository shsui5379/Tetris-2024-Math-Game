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
    //Constructs a 2D grid object and initializes it on call
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
        __classPrivateFieldSet(this, _Grid_grid, [[]], "f");
        __classPrivateFieldSet(this, _Grid_coolDown, 3000, "f");
        __classPrivateFieldSet(this, _Grid_dropTime, 1000, "f");
        this.makeGrid(__classPrivateFieldGet(this, _Grid_numRow, "f"), __classPrivateFieldGet(this, _Grid_numCol, "f"), element);
        console.log(__classPrivateFieldGet(this, _Grid_grid, "f"));
    }
    //Initializes the 2D Grid object by creating (row * col) Tile objects
    makeGrid(row, col, element) {
        var grid = __classPrivateFieldGet(this, _Grid_grid, "f");
        for (let r = 0; r < row; r++) {
            grid[r] = new Array(col);
            for (let c = 0; c < col; c++) {
                grid[r][c] = new Tile(element);
            }
        }
    }
    //Refreshes and updates each Tile object 
    display() {
        var grid = __classPrivateFieldGet(this, _Grid_grid, "f");
        grid.forEach(function (row) {
            row.forEach(function (tile) {
                tile.display();
            });
        });
    }
    //Receives user inputs in the form of arrow keys to move Tiles
    moveTiles(condition) {
        //Uses methods from the merge condition
    }
    //Checks if the current Tile can be moved down
    moveTileDown(tileRow, tileCol) {
        var grid = __classPrivateFieldGet(this, _Grid_grid, "f");
        var validLocation = this.isValidLocation(tileRow + 1, tileCol);
        if (!validLocation)
            return false;
        var empty = grid[tileRow + 1][tileCol].isEmpty();
        // console.log("the next tile is a valid location: " + validLocation);
        // console.log("the next tile is empty: " + empty);
        console.log("moving tile down");
        if (!empty)
            return false; //Checks if Tile[row+1][col] is out of bounds or empty
        else {
            console.log('preparing to swap tiles');
            grid[tileRow + 1][tileCol].swap(grid[tileRow][tileCol]); //Swaps the current [row][col] with [row+1][col]
            return true;
        }
    }
    //Checks if the current Tile can be merged right
    mergeTileRight(tileRow, tileCol) {
        return false;
    }
    dropRandomNumber() {
        var grid = __classPrivateFieldGet(this, _Grid_grid, "f");
        var randomColumn = Math.floor((Math.random() * __classPrivateFieldGet(this, _Grid_numCol, "f"))); //Generates a number in interval [0,this.#numCol-1]
        if ((!grid[0][randomColumn].isEmpty()))
            return false; //If the first row of the chosen column is not empty, the player loses
        else {
            let randomNumber = Math.floor((Math.random() * 3) + 1); //Generates number in interval [1,3]
            let randomColor = Tile.getAvailableColors()[Math.floor((Math.random() * Tile.getAvailableColors().length))]; //Generates a number in interval [0,Tile.availableColors().length-1]
            console.log(randomColumn, randomColor, randomNumber);
            //Update the first Tile object in row 1 to the randomly generated Tile properties
            grid[0][randomColumn].setColor(randomColor);
            grid[0][randomColumn].setNumber(randomNumber);
            grid[0][randomColumn].setShape("square");
            grid[0][randomColumn].display();
            let currRow = 0;
            let currCol = randomColumn;
            let totalDropTime = this.calculateDropSeconds(currRow + 1, currCol);
            let dropInterval = setInterval(() => {
                if ((!this.moveTileDown(currRow, currCol))) {
                    clearInterval(dropInterval);
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
        while (this.isValidLocation(r, col)) {
            if (grid[r][col].isEmpty())
                emptyTileCount++;
            r++;
        }
        return emptyTileCount * this.getDropTime();
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
//# sourceMappingURL=Grid.js.map