import React from 'react';

export class CanvasManager {
    constructor(public readonly canvas: HTMLCanvasElement) {}

    _getContext() {
        return this.canvas.getContext('2d')!;
    }

    clear() {
        const ctx = this._getContext();
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    getRelativeCoords(x: number, y: number) {
        const rect = this.canvas.getBoundingClientRect();
        return [x - rect.left, (y = y - rect.top)];
    }

    drawCircle(x: number, y: number, radius: number, filled: boolean) {
        const ctx = this._getContext();
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        if (filled) {
            ctx.fillStyle = 'lightgrey';
            ctx.fill();
        }
        ctx.stroke();
    }
}

export const useCanvas = function () {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const [canvas, setCanvas] = React.useState<CanvasManager | null>(null);
    React.useEffect(() => {
        if (canvasRef.current === null) return;
        setCanvas(new CanvasManager(canvasRef.current));
    }, [canvasRef.current]);
    return [canvasRef, canvas] as [React.MutableRefObject<HTMLCanvasElement | null>, CanvasManager | null];
};
