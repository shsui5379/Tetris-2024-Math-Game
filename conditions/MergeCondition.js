"use strict";
var possibleConditions = [];
function testConditions() {
    for (let condition of possibleConditions) {
        condition.testUnit();
    }
}
possibleConditions.push(new SumToParity());
possibleConditions.push(new SumToPrimality());
possibleConditions.push(new IdenticalTiles());
possibleConditions.push(new DifferenceOfX());
possibleConditions.push(new RatioOfX());
possibleConditions.push(new SameParity());
possibleConditions.push(new CongruentModX());
//# sourceMappingURL=MergeCondition.js.map