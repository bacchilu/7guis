import React from 'react';

import {Circle, Operation, OperationType} from '../types';
import {useCanvas} from './utils';

export const Canvas: React.FC<{width: number; onOperation: (v: Operation) => void; content: Circle[]}> = function ({
    width,
    onOperation,
    content,
}) {
    const [canvasRef, canvasManager] = useCanvas();
    React.useEffect(() => {
        if (canvasManager === null) return;

        canvasManager.clear();
        for (const circle of content) canvasManager.drawCircle(circle.x, circle.y, circle.radius);
    }, [content]);

    const handleCanvasClick = function (e: React.MouseEvent<HTMLCanvasElement>) {
        if (canvasManager === null) return;

        const [x, y] = canvasManager.getRelativeCoords(e.clientX, e.clientY);
        onOperation({type: OperationType.DRAW, content: new Circle(x, y)} as Operation);
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
