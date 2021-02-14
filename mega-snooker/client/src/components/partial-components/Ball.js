import React from 'react'
import { Stage, Layer, Circle } from 'react-konva';

export default function Ball() {
    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
                <Circle x={200} y={100} radius={50} fill="green" />
            </Layer>
        </Stage>
    )
}