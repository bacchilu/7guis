// TODO: Manage when I change the width of the window

import React from 'react';

import {Card} from '../../libs/bootstrap';
import {Canvas} from './canvas';
import {Circle, Operation, OperationType} from './types';

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
        if (op.type === OperationType.DRAW) setCirclesList(circlesList.filter((circle) => circle !== op.circle));
        else throw new Error('Operation not recognized');
    };

    const redo = function (op: Operation) {
        if (op.type === OperationType.DRAW) setCirclesList([...circlesList, op.circle]);
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
