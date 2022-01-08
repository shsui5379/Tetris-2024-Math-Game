class Grid {
    #numRow: number;
    #numCol: number;
    #grid: Tile[][];

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

        for (let r = 0; r < this.#numRow; r++) {
            let rowOfTiles: Tile[] = [];

            for (let c = 0; c < this.#numCol; c++) {
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

    // moveTiles(){}
    // dropRandomNumber(){}
    // clear(){}
}

