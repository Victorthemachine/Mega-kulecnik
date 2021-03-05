import React from 'react';
import Ratio from 'react-ratio';

const style = {
    border: '1px solid black',
};

console.log([window.innerWidth / -2, 100 - window.innerHeight, window.innerWidth, window.innerHeight]);
const viewBox = [window.innerWidth / -2, 100 - window.innerHeight, window.innerWidth, window.innerHeight];
/**
 * This is the window essentially. Everything you want to draw goes here!
 * All components are to be passed as props, see /reducers/index.js for context.
 * 
 * @param {*} props 
 * @returns 
 */
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