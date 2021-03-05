import React from 'react';
import Table from './../components/Table';
import Balls from './../components/Balls';

/**
 * All the variables that you will be passing to Canvas
 */
const initialState = {
    children: [
        <Table key={0} />,
        <Balls key={1} />
    ],
    message: `How in the fucks name is this working`,
};

function reducer(state = initialState) {
    return state;
}

export default reducer;