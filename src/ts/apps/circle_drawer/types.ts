import {CanvasManager} from './canvas/utils';

const DEFAULT_RADIUS = 10;

export interface Drawable {
    draw(canvasManager: any): void;
}

export class Circle implements Drawable {
    constructor(public x: number, public y: number, public radius: number = DEFAULT_RADIUS) {}

    public draw(canvasManager: CanvasManager) {
        canvasManager.drawCircle(this.x, this.y, this.radius);
    }
}

export enum OperationType {
    DRAW,
}

export interface Operation<T> {
    type: OperationType;
    content: T;
}
