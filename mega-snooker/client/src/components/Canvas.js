import React from 'react';

const style = {
    border: '1px solid black',
};

const viewBox = [window.innerWidth / -2, 100 - window.innerHeight, window.innerWidth, window.innerHeight];

const Canvas = (props) => {
    return (
        <svg
            id="snooker-game-canvas"
            viewBox={viewBox}
            style={style}
            preserveAspectRatio="xMaxYMax none"
        >
        {props.images}
        </svg>
    );
};

export default Canvas;