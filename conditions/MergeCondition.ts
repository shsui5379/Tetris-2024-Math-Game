interface MergeCondition {
    check(tile1: Tile, tile2: Tile): boolean;
    toString(): string;
    randomizeParameters(): void;
    testUnit(): void;
}

var possibleConditions: MergeCondition[] = [];

function testConditions(): void {
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