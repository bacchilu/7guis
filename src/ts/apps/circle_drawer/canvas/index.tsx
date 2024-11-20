import React from 'react';

import {Drawable} from '../types';
import {useCanvas} from './utils';

export const Canvas: React.FC<{
    width: number;
    content: Drawable[];
    onClick: (x: number, y: number) => void;
    onMove: (x: number, y: number) => void;
}> = function ({width, content, onClick, onMove}) {
    const [canvasRef, canvasManager] = useCanvas();
    React.useEffect(() => {
        if (canvasManager === null) return;

        canvasManager.clear();
        for (const item of content) item.draw(canvasManager);
    }, [content]);

    const handleCanvasClick = function (e: React.MouseEvent<HTMLCanvasElement>) {
        if (canvasManager === null) return;

        const [x, y] = canvasManager.getRelativeCoords(e.clientX, e.clientY);
        onClick(x, y);
    };

    const handleCanvasMouseMove = function (e: React.MouseEvent<HTMLCanvasElement>) {
        if (canvasManager === null) return;

        const [x, y] = canvasManager.getRelativeCoords(e.clientX, e.clientY);
        onMove(x, y);
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
