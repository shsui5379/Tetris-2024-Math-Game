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
var _a, _Tile_availableColors, _Tile_number, _Tile_color, _Tile_shape, _Tile_element;
class Tile {
    //Constructor
    //Receives the Grid object to be appended with a Tile object in its default state
    constructor(parentGridElement) {
        //The numerical value that a Tile object displays
        _Tile_number.set(this, void 0);
        //The background color of a Tile object
        _Tile_color.set(this, void 0);
        //The shape for a Tile object
        _Tile_shape.set(this, void 0);
        //The HTMLDivElement that represents the Tile object
        _Tile_element.set(this, void 0);
        __classPrivateFieldSet(this, _Tile_element, document.createElement("div"), "f");
        __classPrivateFieldSet(this, _Tile_number, "", "f");
        __classPrivateFieldSet(this, _Tile_color, "#000000", "f");
        __classPrivateFieldSet(this, _Tile_shape, "square", "f");
        __classPrivateFieldGet(this, _Tile_element, "f").classList.add("tile");
        this.display();
        parentGridElement.appendChild(__classPrivateFieldGet(this, _Tile_element, "f"));
    }
    //Primary Method
    //Displays Tile object's properties to the HTML Document
    display() {
        __classPrivateFieldGet(this, _Tile_element, "f").style.backgroundColor = __classPrivateFieldGet(this, _Tile_color, "f");
        __classPrivateFieldGet(this, _Tile_element, "f").classList.add(__classPrivateFieldGet(this, _Tile_shape, "f"));
        __classPrivateFieldGet(this, _Tile_element, "f").innerHTML = __classPrivateFieldGet(this, _Tile_number, "f").toString();
    }
    //Checks if the Tile object is empty (has a number assigned to it or not)
    isEmpty() {
        return (__classPrivateFieldGet(this, _Tile_number, "f") === "" || __classPrivateFieldGet(this, _Tile_color, "f") === "#000000");
    }
    //Configure the Tile object's properties to their default values
    empty() {
        __classPrivateFieldSet(this, _Tile_number, "", "f");
        __classPrivateFieldSet(this, _Tile_color, "#000000", "f");
        __classPrivateFieldSet(this, _Tile_shape, "square", "f");
    }
    //Merges a Tile object with another Tile object
    merge(other) {
        var thisEmpty = this.isEmpty();
        var otherEmpty = other.isEmpty();
        var newNumber = (__classPrivateFieldGet(this, _Tile_number, "f") || 0) + (other.getNumber() || 0);
        if (!thisEmpty && !otherEmpty) {
            other.empty();
            this.setNumber(newNumber);
        }
    }
    //Swaps the properties of a Tile object with another Tile object
    swap(other) {
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
    getNumber() {
        return __classPrivateFieldGet(this, _Tile_number, "f");
    }
    getColor() {
        return __classPrivateFieldGet(this, _Tile_color, "f");
    }
    getShape() {
        return __classPrivateFieldGet(this, _Tile_shape, "f");
    }
    getDivElement() {
        return __classPrivateFieldGet(this, _Tile_element, "f");
    }
    static getAvailableColors() {
        return __classPrivateFieldGet(this, _a, "f", _Tile_availableColors);
    }
    //Setter Methods
    setNumber(newNumber) {
        __classPrivateFieldSet(this, _Tile_number, newNumber, "f");
    }
    setColor(newColor) {
        __classPrivateFieldSet(this, _Tile_color, newColor, "f");
    }
    setShape(newShape) {
        __classPrivateFieldSet(this, _Tile_shape, newShape, "f");
    }
}
_a = Tile, _Tile_number = new WeakMap(), _Tile_color = new WeakMap(), _Tile_shape = new WeakMap(), _Tile_element = new WeakMap();
//Properties
//A list of available colors to pick from (excluding the default color #000000)
_Tile_availableColors = { value: ["#F44336", "#2196F3", "#4CAF50", "#FF9800", "#795548"] };
//# sourceMappingURL=Tile.js.map