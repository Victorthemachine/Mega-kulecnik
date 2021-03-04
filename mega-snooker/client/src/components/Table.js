import React, { useState, useEffect, useRef } from 'react'
import TableImage from './../assets/table/table.min.pepa.svg';

export default function Table(props) {
    const offsetTop = window.innerHeight / 20;
/*    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(1);

    const ref = useRef(null);

    useEffect(() => {
        setHeight(ref.current.clientHeight);
        setWidth(ref.current.clientWidth)
    }, []);*/

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
