const DEFAULT_RADIUS = 10;

export class Circle {
    constructor(public x: number, public y: number, public radius: number = DEFAULT_RADIUS) {}
}

export enum OperationType {
    DRAW,
}

export interface Operation {
    type: OperationType;
    circle: Circle;
}
