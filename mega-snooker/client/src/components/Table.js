import React from 'react'
import TableImage from './../assets/table/table.min.pepa.svg';

/**
 * Table component, it is critical not to touch viewbox nor preserveAspectRatio!
 * @param {*} props 
 * @returns 
 */
export default function Table(props) {
    return (
        <TableImage
            x={window.innerWidth / -2}
            y={(100 - window.innerHeight)}
            width={window.innerWidth}
            height={window.innerHeight}
            viewbox={[0, 0, 100, 100]}
            preserveAspectRatio="xMidYMid meet"
        />
    )
}
