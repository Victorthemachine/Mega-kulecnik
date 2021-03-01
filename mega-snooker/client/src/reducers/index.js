import React from 'react';
import Ball from './../assets/balls/10/10-2.svg';

const initialState = {
    children: [
        <Ball x={-1000} y={-1000} key={1}/>,
        <Ball x={-100} y={-1000} key={2}/>,
        <Ball x={-1000} y={-100} key={3}/>,
    ],
    message: `How in the fucks name is this working`,
};

function reducer(state = initialState) {
    return state;
}

export default reducer;