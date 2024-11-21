import {CanvasManager} from './canvas/utils';

const DEFAULT_RADIUS = 20;

export interface Drawable {
    draw(canvasManager: any): void;
}

export class Circle implements Drawable {
    constructor(
        public x: number,
        public y: number,
        public filled: boolean = false,
        public radius: number = DEFAULT_RADIUS
    ) {}

    public draw(canvasManager: CanvasManager) {
        canvasManager.drawCircle(this.x, this.y, this.radius, this.filled);
    }

    public distanceFrom(x: number, y: number) {
        const dx = this.x - x;
        const dy = this.y - y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    public static findClosest(circles: Circle[], x: number, y: number): Circle | null {
        if (circles.length === 0) return null;
        if (circles.length === 1) return circles[0];
        const [first, ...rest] = circles;
        const restClosestCircle = Circle.findClosest(rest, x, y);
        if (restClosestCircle === null) return first;
        const firstDistance = first.distanceFrom(x, y);
        const restDistance = restClosestCircle.distanceFrom(x, y);
        return firstDistance <= restDistance ? first : restClosestCircle;
    }

    public clone(filled: boolean) {
        return new Circle(this.x, this.y, filled, this.radius);
    }
}

export enum OperationType {
    DRAW,
}

export interface Operation<T> {
    type: OperationType;
    content: T;
}
