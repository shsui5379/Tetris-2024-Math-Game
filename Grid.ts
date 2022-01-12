class Grid{
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

    //Constructs a 2D grid object and initializes it on call
    constructor(row: number, column: number, element: HTMLDivElement){
        this.#numRow = row;
        this.#numCol = column;
        this.#grid = [[]];
        this.#coolDown = 3000;
        this.#dropTime = 1000;
        this.makeGrid(this.#numRow, this.#numCol, element);

        console.log(this.#grid);
    }

    //Initializes the 2D Grid object by creating (row * col) Tile objects
    makeGrid(row: number, col: number, element: HTMLDivElement): void{
        var grid = this.#grid;
        for (let r=0; r<row; r++){
            grid[r] = new Array(col);
            for (let c=0; c<col; c++){
                grid[r][c] = new Tile(element);
            }
        }
    }

    //Refreshes and updates each Tile object 
    display(): void{
        var grid = this.#grid;
        grid.forEach(function(row: Tile[]): void{   
            row.forEach(function(tile: Tile): void{
                tile.display();
            });
        });
    }

    //Receives user inputs in the form of arrow keys to move Tiles
    moveTiles(condition: MergeCondition){
        //Uses methods from the merge condition
    }

    //Checks if the current Tile can be moved down
    moveTileDown(tileRow: number, tileCol: number): boolean{
        var grid = this.#grid;
        var validLocation = this.isValidLocation(tileRow+1, tileCol);
        if (!validLocation) return false;
        var empty = grid[tileRow+1][tileCol].isEmpty();

        // console.log("the next tile is a valid location: " + validLocation);
        // console.log("the next tile is empty: " + empty);
        console.log("moving tile down");
        if (!empty) return false;       //Checks if Tile[row+1][col] is out of bounds or empty
        else{
            console.log('preparing to swap tiles');
            grid[tileRow+1][tileCol].swap(grid[tileRow][tileCol]);  //Swaps the current [row][col] with [row+1][col]
            return true;
        }
    }

    //Checks if the current Tile can be merged right
    mergeTileRight(tileRow: number, tileCol: number): boolean{
        return false;
    }

    dropRandomNumber(): (boolean | number){
        var grid = this.#grid;
        var randomColumn = Math.floor((Math.random() * this.#numCol)); //Generates a number in interval [0,this.#numCol-1]

        if ((!grid[0][randomColumn].isEmpty())) return false;   //If the first row of the chosen column is not empty, the player loses
        else{
            let randomNumber = Math.floor((Math.random() * 3) + 1); //Generates number in interval [1,3]
            let randomColor = Tile.getAvailableColors()[Math.floor((Math.random() * Tile.getAvailableColors().length))]; //Generates a number in interval [0,Tile.availableColors().length-1]

            console.log(randomColumn, randomColor, randomNumber);
            //Update the first Tile object in row 1 to the randomly generated Tile properties
            grid[0][randomColumn].setColor(randomColor as Color);
            grid[0][randomColumn].setNumber(randomNumber);
            grid[0][randomColumn].setShape("square");
            grid[0][randomColumn].display();

            let currRow = 0;
            let currCol = randomColumn;
            let totalDropTime = this.calculateDropSeconds(currRow+1, currCol);

            let dropInterval = setInterval(() => {
                if ((!this.moveTileDown(currRow, currCol))){
                    clearInterval(dropInterval);
                }
                else{
                    this.moveTileDown(currRow, currCol);
                    this.display();
                    currRow++;
                }
            }, this.getDropTime());

            return (this.#coolDown + totalDropTime);
        }
    }

    //Calculates the number of seconds for a Tile to touch the ground
    calculateDropSeconds(row: number, col: number): number{
        var grid = this.#grid;
        var emptyTileCount = 0;
        var r = row;
        while (this.isValidLocation(r, col)){
            if (grid[r][col].isEmpty()) emptyTileCount++;
            r++;
        }   

        return emptyTileCount * this.getDropTime();
    }

    //Checks if a Tile object’s row/col values are out of bounds
    isValidLocation(tileRow: number, tileCol: number): boolean{
        return ((tileRow >= 0 && tileRow <= this.#numRow-1) && (tileCol >= 0 && tileCol <= this.#numCol-1));
    }

    //Empties (sets to default values) each Tile object
    clear(): void{
        var grid = this.#grid;
        grid.forEach(function(row: Tile[]): void{   
            row.forEach(function(tile: Tile): void{
                tile.empty();
            });
        });
    }
   
    //Setter Method(s)
    setCoolDown(cd: number): void{
        this.#coolDown = cd;
    }

    setDropTime(dt: number): void{
        this.#dropTime = dt;
    }

    //Getter Method(s)
    getCoolDown(): number{
        return this.#coolDown;
    }

    getDropTime(): number{
        return this.#dropTime;
    }
}

