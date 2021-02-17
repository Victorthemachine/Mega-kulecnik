import React from 'react'
import { Stage, Layer } from 'react-konva';

export default function Snooker() {
    return (
        <div>
            <Stage>
                {/**NOTE: probably better to use some resize utility */}
                <Layer width={window.innerWidth} height={window.innerHeight}>

                </Layer>
            </Stage>
        </div>
    )
}
