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
    const [menuPosition, setMenuPosition] = React.useState({x: 0, y: 0});
    const [showMenu, setShowMenu] = React.useState(false);

    const handleCanvasClick = function (e: React.MouseEvent<HTMLCanvasElement>) {
        if (showMenu) {
            setShowMenu(false);
            return;
        }
        if (canvasManager === null) return;

        const [x, y] = canvasManager.getRelativeCoords(e.clientX, e.clientY);
        onClick(x, y);
    };

    const handleCanvasMouseMove = function (e: React.MouseEvent<HTMLCanvasElement>) {
        if (canvasManager === null) return;

        const [x, y] = canvasManager.getRelativeCoords(e.clientX, e.clientY);
        onMove(x, y);
    };

    const handleContextMenu = function (e: React.MouseEvent<HTMLCanvasElement>) {
        e.preventDefault();
        if (canvasManager === null) return;

        const [x, y] = canvasManager.getRelativeCoords(e.clientX, e.clientY);
        setMenuPosition({x, y: y - width / 2});
        setShowMenu(true);
    };

    const handleMenu = function () {
        console.log('TODO');
        setShowMenu(false);
    };

    return (
        <div style={{position: 'static'}}>
            <canvas
                ref={canvasRef}
                height={width / 2}
                width={width}
                onClick={handleCanvasClick}
                onMouseMove={handleCanvasMouseMove}
                onContextMenu={handleContextMenu}
                style={{cursor: 'crosshair'}}
            />
            {showMenu && (
                <ul
                    style={{
                        position: 'relative',
                        top: `${menuPosition.y}px`,
                        left: `${menuPosition.x}px`,
                        width: '150px',
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        listStyle: 'none',
                        padding: '1px',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                        zIndex: 1000,
                    }}
                >
                    <li style={{padding: '5px 10px', cursor: 'pointer'}} onClick={handleMenu}>
                        Adjust diameter...
                    </li>
                </ul>
            )}
        </div>
    );
};
