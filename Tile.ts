//Type Alias for Tile class
type Shape = "square";
type Color = "#000000" | "#F44336" | "#2196F3" | "#4CAF50" | "#FF9800" | "#795548";
type TileNumber = number | "";

class Tile {
    //Properties
    //A list of available colors to pick from (excluding the default color #000000)
    static #availableColors: Color[] = ["#F44336", "#2196F3", "#4CAF50", "#FF9800", "#795548"];

    //A list of available shapes to pick from
    static #availableShapes: Shape[] = ["square"];

    //The numerical value that a Tile object displays
    #number: TileNumber;

    //The background color of a Tile object
    #color: Color;

    //The shape for a Tile object
    #shape: Shape;

    //whether this Tile is currently dropping
    #dropping: boolean;

    //The HTMLDivElement that represents the Tile object
    #element: HTMLDivElement;


    //Constructor
    //Receives the Grid object to be appended with a Tile object in its default state
    constructor(parentGridElement: HTMLDivElement) {
        this.#element = document.createElement("div");
        this.#number = "";
        this.#color = "#000000";
        this.#shape = "square";
        this.#dropping = false;

        this.#element.classList.add("tile");

        this.display();
        parentGridElement.appendChild(this.#element);
    }

    //Primary Method
    //Displays Tile object's properties to the HTML Document
    public display(): void {
        for (let shape of Tile.#availableShapes) {
            this.#element.classList.remove(shape);
        }

        this.#element.style.backgroundColor = this.#color;
        this.#element.classList.add(this.#shape);
        this.#element.innerHTML = this.#number.toString();
    }

    //Checks if the Tile object is empty (has a number assigned to it or not)
    public isEmpty(): boolean {
        return (this.#number === "" || this.#color === "#000000");
    }

    //Configure the Tile object's properties to their default values
    public empty(): void {
        this.#number = "";
        this.#color = "#000000";
        this.#shape = "square";
    }

    //Merges a Tile object with another Tile object
    public merge(other: Tile): void {
        var thisEmpty = this.isEmpty();
        var otherEmpty = other.isEmpty();
        var newNumber = (this.#number || 0) + (other.getNumber() || 0);

        if (!thisEmpty && !otherEmpty) {
            other.empty();
            this.setNumber(newNumber);
        }
    }

    //Swaps the properties of a Tile object with another Tile object
    public swap(other: Tile): void {
        var thisTileColor = this.getColor();
        var thisTileShape = this.getShape();
        var thisTileNumber = this.getNumber();

        this.setColor(other.getColor());
        this.setShape(other.getShape());
        this.setNumber(other.getNumber());

        other.setColor(thisTileColor);
        other.setShape(thisTileShape);
        other.setNumber(thisTileNumber);
    }

    //Getter Methods
    public getNumber(): TileNumber {
        return this.#number;
    }

    public getColor(): Color {
        return this.#color;
    }

    public getShape(): Shape {
        return this.#shape;
    }

    public isDropping(): boolean {
        return this.#dropping;
    }

    public getDivElement(): HTMLDivElement {
        return this.#element;
    }

    public static getAvailableColors(): Color[] {
        return this.#availableColors;
    }

    public static getAvailableShapes(): Shape[] {
        return this.#availableShapes;
    }

    //Setter Methods
    public setNumber(newNumber: TileNumber): void {
        this.#number = newNumber;
    }

    public setColor(newColor: Color): void {
        this.#color = newColor;
    }

    public setShape(newShape: Shape): void {
        this.#shape = newShape;
    }

    public setDropping(state: boolean): void {
        this.#dropping = state;
    }
}

