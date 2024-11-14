// TODO: Manage when I change the width of the window

import React from 'react';

import {Card} from '../libs/bootstrap';

const DEFAULT_RADIUS = 10;

class CanvasManager {
    constructor(public readonly canvas: HTMLCanvasElement) {}

    getRelativeCoords(x: number, y: number) {
        const rect = this.canvas.getBoundingClientRect();
        return [x - rect.left, (y = y - rect.top)];
    }

    drawCircle(x: number, y: number) {
        const ctx = this.canvas.getContext('2d')!;
        // ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.beginPath();
        ctx.arc(x, y, DEFAULT_RADIUS, 0, 2 * Math.PI);
        ctx.fillStyle = 'lightgrey';
        ctx.fill();
        ctx.stroke();
    }
}

const Canvas: React.FC<{width: number}> = function ({width}) {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    const handleCanvasClick = function (e: React.MouseEvent<HTMLCanvasElement>) {
        const c = new CanvasManager(canvasRef.current!);

        const [x, y] = c.getRelativeCoords(e.clientX, e.clientY);
        c.drawCircle(x, y);
    };

    const handleCanvasMouseMove = function (e: React.MouseEvent<HTMLCanvasElement>) {
        const c = new CanvasManager(canvasRef.current!);

        const [x, y] = c.getRelativeCoords(e.clientX, e.clientY);
        console.log(x, y);
    };

    return (
        <canvas
            className="border"
            ref={canvasRef}
            height={width / 2}
            width={width}
            onClick={handleCanvasClick}
            onMouseMove={handleCanvasMouseMove}
            style={{cursor: 'crosshair'}}
        />
    );
};

export const DivContainer: React.FC<{setWidth: (v: number) => void; children: React.ReactNode}> = function ({
    setWidth,
    children,
}) {
    const divRef = React.useRef<HTMLDivElement | null>(null);
    React.useEffect(() => {
        setWidth(divRef.current!.clientWidth);
    }, []);

    return (
        <div ref={divRef} className="d-flex justify-content-center">
            {children}
        </div>
    );
};

export const CircleDrawer = function () {
    const [width, setWidth] = React.useState<number | null>(null);

    return (
        <Card title="Circle Drawer" url="https://eugenkiss.github.io/7guis/tasks#circle">
            <DivContainer setWidth={setWidth}>{width !== null && <Canvas width={width} />}</DivContainer>
        </Card>
    );
};
