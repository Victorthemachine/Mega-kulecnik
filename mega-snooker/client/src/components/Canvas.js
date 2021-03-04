import React from 'react';
import Ratio from 'react-ratio';

const style = {
    border: '1px solid black',
};

console.log([window.innerWidth / -2, 100 - window.innerHeight, window.innerWidth, window.innerHeight]);
const viewBox = [window.innerWidth / -2, 100 - window.innerHeight, window.innerWidth, window.innerHeight];

const Canvas = (props) => {
    return (
        <Ratio ratio={224 / 150}>
            <svg
                id="snooker-game-canvas"
                viewBox={viewBox}
                style={style}
                preserveAspectRatio="xMaxYMax"
            >
                {props.images}
            </svg>
        </Ratio>
    );
};

export default Canvas;