import {CanvasManager} from './canvas/utils';

const DEFAULT_RADIUS = 10;

export class Circle {
    constructor(public x: number, public y: number, public radius: number = DEFAULT_RADIUS) {}

    public draw(canvasManager: CanvasManager) {
        canvasManager.drawCircle(this.x, this.y, this.radius);
    }
}

export enum OperationType {
    DRAW,
}

export interface Operation {
    type: OperationType;
    content: Circle;
}
