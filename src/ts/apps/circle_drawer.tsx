// TODO: Manage when I change the width of the window

import React from 'react';

import {Card} from '../libs/bootstrap';

const DEFAULT_RADIUS = 10;

class Circle {
    constructor(public x: number, public y: number, public radius: number = DEFAULT_RADIUS) {}
}

interface Operation {
    type: 'DRAW';
    circle: Circle;
}

class CanvasManager {
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

    drawCircle(x: number, y: number) {
        const ctx = this._getContext();
        ctx.beginPath();
        ctx.arc(x, y, DEFAULT_RADIUS, 0, 2 * Math.PI);
        ctx.fillStyle = 'lightgrey';
        ctx.fill();
        ctx.stroke();
    }
}

const useCanvas = function () {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const [canvas, setCanvas] = React.useState<CanvasManager | null>(null);
    React.useEffect(() => {
        if (canvasRef.current === null) return;
        setCanvas(new CanvasManager(canvasRef.current));
    }, [canvasRef.current]);
    return [canvasRef, canvas] as [React.MutableRefObject<HTMLCanvasElement | null>, CanvasManager | null];
};

const Canvas: React.FC<{width: number; onOperation: (v: Operation) => void; content: Circle[]}> = function ({
    width,
    onOperation,
    content,
}) {
    const [canvasRef, canvasManager] = useCanvas();
    React.useEffect(() => {
        if (canvasManager === null) return;

        canvasManager.clear();
        for (const circle of content) canvasManager.drawCircle(circle.x, circle.y);
    }, [content]);

    const handleCanvasClick = function (e: React.MouseEvent<HTMLCanvasElement>) {
        if (canvasManager === null) return;

        const [x, y] = canvasManager.getRelativeCoords(e.clientX, e.clientY);
        onOperation({type: 'DRAW', circle: new Circle(x, y)} as Operation);
    };

    const handleCanvasMouseMove = function (e: React.MouseEvent<HTMLCanvasElement>) {
        if (canvasManager === null) return;

        const [x, y] = canvasManager.getRelativeCoords(e.clientX, e.clientY);
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

const useCirclesCanvas = function () {
    const [circlesList, setCirclesList] = React.useState<Circle[]>([]);

    const undo = function (op: Operation) {
        if (op.type === 'DRAW') setCirclesList(circlesList.filter((circle) => circle !== op.circle));
        else throw new Error('Operation not recognized');
    };

    const redo = function (op: Operation) {
        if (op.type === 'DRAW') setCirclesList([...circlesList, op.circle]);
        else throw new Error('Operation not recognized');
    };

    return [circlesList, {undo, redo}] as [Circle[], {undo: (op: Operation) => void; redo: (op: Operation) => void}];
};

export const CircleDrawer = function () {
    const [width, setWidth] = React.useState<number | null>(null);
    const [circlesList, {undo, redo}] = useCirclesCanvas();
    const [undoList, setUndoList] = React.useState<Operation[]>([]);
    const [redoList, setRedoList] = React.useState<Operation[]>([]);

    const handleOperation = function (op: Operation) {
        setUndoList([op, ...undoList]);
        redo(op);
    };

    const handleUndo = function () {
        const [lastOp, ...rest] = undoList;
        setUndoList(rest);
        setRedoList([lastOp, ...redoList]);
        undo(lastOp);
    };

    const handleRedo = function () {
        const [lastOp, ...rest] = redoList;
        setUndoList([lastOp, ...undoList]);
        setRedoList(rest);
        redo(lastOp);
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
                {width !== null && <Canvas width={width} onOperation={handleOperation} content={circlesList} />}
            </DivContainer>
        </Card>
    );
};
