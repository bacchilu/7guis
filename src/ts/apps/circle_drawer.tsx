// TODO: Manage when I change the width of the window

import React from 'react';

import {Card} from '../libs/bootstrap';

const DEFAULT_RADIUS = 10;

interface Circle {
    x: number;
    y: number;
    radius: number;
}

interface Operation {
    type: 'DRAW';
    x: number;
    y: number;
    radius: number;
}

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

const Canvas: React.FC<{width: number; onOperation: (v: Operation) => void}> = function ({width, onOperation}) {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    const handleCanvasClick = function (e: React.MouseEvent<HTMLCanvasElement>) {
        const c = new CanvasManager(canvasRef.current!);

        const [x, y] = c.getRelativeCoords(e.clientX, e.clientY);
        c.drawCircle(x, y);
        onOperation({type: 'DRAW', x, y, radius: DEFAULT_RADIUS} as Operation);
    };

    const handleCanvasMouseMove = function (e: React.MouseEvent<HTMLCanvasElement>) {
        const c = new CanvasManager(canvasRef.current!);

        const [x, y] = c.getRelativeCoords(e.clientX, e.clientY);
        // console.log(x, y);
    };

    return (
        <canvas
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
        <div ref={divRef} className="d-flex justify-content-center border">
            {children}
        </div>
    );
};

export const CircleDrawer = function () {
    const [width, setWidth] = React.useState<number | null>(null);
    const [circlesList, setCirclesList] = React.useState<Circle[]>([]);
    const [undoList, setUndoList] = React.useState<Operation[]>([]);
    const [redoList, setRedoList] = React.useState<Operation[]>([]);

    const handleOperation = function (op: Operation) {
        setCirclesList([...circlesList, {x: op.x, y: op.y, radius: op.radius} as Circle]);
        setUndoList([op, ...undoList]);
    };

    console.log(circlesList);

    const handleUndo = function () {
        const [lastOp, ...rest] = undoList;
        setUndoList(rest);
        setRedoList([lastOp, ...redoList]);
        console.log(`I want to remove ${JSON.stringify(lastOp)}`);
    };

    const handleRedo = function () {
        const [lastOp, ...rest] = redoList;
        setUndoList([lastOp, ...undoList]);
        setRedoList(rest);
        console.log(`I want to add ${JSON.stringify(lastOp)}`);
    };

    const isUndoDisabled = undoList.length === 0;
    const isRedoDisabled = redoList.length === 0;

    return (
        <Card title="Circle Drawer" url="https://eugenkiss.github.io/7guis/tasks#circle">
            <div className="d-flex justify-content-center mb-4">
                <button className="btn btn-outline-secondary me-4" disabled={isUndoDisabled} onClick={handleUndo}>
                    Undo
                </button>
                <button className="btn btn-outline-secondary ms-4" disabled={isRedoDisabled} onClick={handleRedo}>
                    Redo
                </button>
            </div>
            <DivContainer setWidth={setWidth}>
                {width !== null && <Canvas width={width} onOperation={handleOperation} />}
            </DivContainer>
        </Card>
    );
};
