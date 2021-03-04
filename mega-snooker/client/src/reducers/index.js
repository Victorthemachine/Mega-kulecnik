import React from 'react';

import BALL_0 from './../assets/balls/0/0-1.svg';
import BALL_1 from './../assets/balls/1/1-1.svg';
import BALL_2 from './../assets/balls/2/2-1.svg';
import BALL_3 from './../assets/balls/3/3-1.svg';
import BALL_4 from './../assets/balls/4/4-1.svg';
import BALL_5 from './../assets/balls/5/5-1.svg';
import BALL_6 from './../assets/balls/6/6-1.svg';
import BALL_7 from './../assets/balls/7/7-1.svg';
import BALL_8 from './../assets/balls/8/8-1.svg';
import BALL_9 from './../assets/balls/9/9-1.svg';
import BALL_10 from './../assets/balls/10/10-1.svg';
import BALL_11 from './../assets/balls/11/11-1.svg';
import BALL_12 from './../assets/balls/12/12-1.svg';
import BALL_13 from './../assets/balls/13/13-1.svg';
import BALL_14 from './../assets/balls/14/14-1.svg';
import BALL_15 from './../assets/balls/15/15-1.svg';

import Table from './../components/Table';

console.log([window.innerWidth / -2, 100 - window.innerHeight, window.innerWidth / 2, window.innerHeight]);
console.log(BALL_1);
const viewBox = [0, 0, 100, 100];
const offsetTop = window.innerHeight / 20;
const widthWithOffset = ((window.innerHeight - (2 * offsetTop)) / 150) * 224;
console.log(widthWithOffset)
console.log(((window.innerWidth) - widthWithOffset) * -1.5);
const ballRad = 57 * (window.innerHeight / 1120) * 2;
console.log(ballRad);
console.log(62 * (window.innerHeight / 1120) * 2);


const initialState = {
    children: [
        //        <BALL x={-1000} y={-1000} key={1}/>,
        //        <BALL x={-100} y={-1000} key={2}/>,
        //        <BALL x={-1000} y={-100} key={3} />,
        <Table key={0} />,
        //<BALL x={0} y={0} viewBox={viewBox} key={4} />,
        <BALL_0 x={-1} y={0} width={62 * (window.innerHeight / 1120) * 2} viewBox={viewBox} key={1} />,
        <BALL_1 x={-100} y={0} width={ballRad} viewBox={viewBox} key={2} />,
        <BALL_2 x={-200} y={0} width={ballRad} viewBox={viewBox} key={3} />,
        <BALL_3 x={-300} y={0} width={ballRad} viewBox={viewBox} key={4} />,
        <BALL_4 x={-400} y={0} width={ballRad} viewBox={viewBox} key={5} />,
        <BALL_5 x={-500} y={0} width={ballRad} viewBox={viewBox} key={6} />,
        <BALL_6 x={-1} y={-100} width={ballRad} viewBox={viewBox} key={7} />,
        <BALL_7 x={-100} y={-100} width={ballRad} viewBox={viewBox} key={8} />,
        <BALL_8 x={-200} y={-100} width={ballRad} viewBox={viewBox} key={9} />,
        <BALL_9 x={-300} y={-100} width={ballRad} viewBox={viewBox} key={10} />,
        <BALL_10 x={-400} y={-100} width={ballRad} viewBox={viewBox} key={11} />,
        <BALL_11 x={-500} y={-100} width={ballRad} viewBox={viewBox} key={12} />,
        <BALL_12 x={-1} y={-200} width={ballRad} viewBox={viewBox} key={13} />,
        <BALL_13 x={-100} y={-200} width={ballRad} viewBox={viewBox} key={14} />,
        <BALL_14 x={-200} y={-200} width={ballRad} viewBox={viewBox} key={15} />,
        <BALL_15 x={-300} y={-200} width={ballRad} viewBox={viewBox} key={16} />,
    ],
    message: `How in the fucks name is this working`,
};

function reducer(state = initialState) {
    return state;
}

export default reducer;