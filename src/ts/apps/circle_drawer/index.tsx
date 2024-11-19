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
    const [undoList, setUndoList] = React.useState<Operation[]>([]);
    const [redoList, setRedoList] = React.useState<Operation[]>([]);

    const undoFn = function () {
        const [lastOp, ...rest] = undoList;
        setUndoList(rest);
        setRedoList([lastOp, ...redoList]);

        if (lastOp.type === OperationType.DRAW)
            setCirclesList(circlesList.filter((circle) => circle !== lastOp.circle));
        else throw new Error('Operation not recognized');
    };

    const redoFn = function () {
        const [lastOp, ...rest] = redoList;
        setUndoList([lastOp, ...undoList]);
        setRedoList(rest);

        if (lastOp.type === OperationType.DRAW) setCirclesList([...circlesList, lastOp.circle]);
        else throw new Error('Operation not recognized');
    };

    const doFn = function (op: Operation) {
        setUndoList([op, ...undoList]);

        if (op.type === OperationType.DRAW) setCirclesList([...circlesList, op.circle]);
        else throw new Error('Operation not recognized');
    };

    const isUndoDisabled = undoList.length === 0;
    const isRedoDisabled = redoList.length === 0;

    return [circlesList, {doFn, undoFn: isUndoDisabled ? null : undoFn, redoFn: isRedoDisabled ? null : redoFn}] as [
        Circle[],
        {doFn: (op: Operation) => void; undoFn: () => void | null; redoFn: () => void | null}
    ];
};

export const CircleDrawer = function () {
    const [width, setWidth] = React.useState<number | null>(null);
    const [circlesList, {doFn, undoFn, redoFn}] = useCirclesCanvas();

    return (
        <Card title="Circle Drawer" url="https://eugenkiss.github.io/7guis/tasks#circle">
            <div className="d-flex justify-content-center mb-4">
                <button className="btn btn-outline-secondary me-4" disabled={undoFn === null} onClick={undoFn}>
                    Undo
                </button>
                <button className="btn btn-outline-secondary ms-4" disabled={redoFn === null} onClick={redoFn}>
                    Redo
                </button>
            </div>
            <DivContainer setWidth={setWidth}>
                {width !== null && <Canvas width={width} onOperation={doFn} content={circlesList} />}
            </DivContainer>
        </Card>
    );
};
