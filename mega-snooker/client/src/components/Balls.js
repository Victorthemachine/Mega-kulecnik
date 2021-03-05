import React, { Component } from 'react';
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

const apiTool = require('./../utilities/apiTool');
const API = new apiTool();

const viewBox = [0, 0, 100, 100];
const ballRad = 57 * (window.innerHeight / 1120) * 2;
const whiteRad = 62 * (window.innerHeight / 1120) * 2;
const points = [];
let secret = '';

/**
 * All balls are here. They are currently being rendered with positions from api so don't forget to turn it on.
 * Don't touch viewBox, only adjust X and Y cordinates, radius is calculated before based on window size and maintains aspect ratio
 * TLDR: only touch X and Y.
 */
class Balls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            points: [
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 }
            ]
        };
    }

    componentDidMount() {
        console.log(secret);
        if (secret === '') {
            API.createGame().then(fin => {
                secret = fin;
                let confirm = API.gameUpdatePositions(secret.id, {
                    "height": -(100 - window.innerHeight),
                    "windowWidth": window.innerWidth,
                    "radius": ballRad / 2,
                    "radiusWhite": whiteRad / 2
                }).then(fin => {
                    API.gameIntialPlacement(secret.id).then(parsePoints => {
                        for (let i = 0; i < 16; i++) {
                            points.push(parsePoints[i]);
                        }
                        console.log(points);
                        this.setState({ points: points })
                    });
                });
                console.log(confirm);
            });                
        } else {
            let confirm = API.gameUpdatePositions(secret.id, {
                "height": -(100 - window.innerHeight),
                "windowWidth": window.innerWidth,
                "radius": ballRad / 2,
                "radiusWhite": whiteRad / 2
            }).then(fin => {
                API.gameIntialPlacement(secret.id).then(parsePoints => {
                    for (let i = 0; i < 16; i++) {
                        points.push(parsePoints[i]);
                    }
                    console.log(points);
                    this.setState({ points: points })
                });
            });
            console.log(confirm);
        }
    }

    render() {
        return (
            <>
                <BALL_0 x={this.state.points[0].x} y={this.state.points[0].y} width={whiteRad} viewBox={viewBox} key={1} />,
                <BALL_1 x={this.state.points[1].x} y={this.state.points[1].y} width={ballRad} viewBox={viewBox} key={2} />,
                <BALL_2 x={this.state.points[2].x} y={this.state.points[2].y} width={ballRad} viewBox={viewBox} key={3} />,
                <BALL_3 x={this.state.points[3].x} y={this.state.points[3].y} width={ballRad} viewBox={viewBox} key={4} />,
                <BALL_4 x={this.state.points[4].x} y={this.state.points[4].y} width={ballRad} viewBox={viewBox} key={5} />,
                <BALL_5 x={this.state.points[5].x} y={this.state.points[5].y} width={ballRad} viewBox={viewBox} key={6} />,
                <BALL_6 x={this.state.points[6].x} y={this.state.points[6].y} width={ballRad} viewBox={viewBox} key={7} />,
                <BALL_7 x={this.state.points[7].x} y={this.state.points[7].y} width={ballRad} viewBox={viewBox} key={8} />,
                <BALL_8 x={this.state.points[8].x} y={this.state.points[8].y} width={ballRad} viewBox={viewBox} key={9} />,
                <BALL_9 x={this.state.points[9].x} y={this.state.points[9].y} width={ballRad} viewBox={viewBox} key={10} />,
                <BALL_10 x={this.state.points[10].x} y={this.state.points[10].y} width={ballRad} viewBox={viewBox} key={11} />,
                <BALL_11 x={this.state.points[11].x} y={this.state.points[11].y} width={ballRad} viewBox={viewBox} key={12} />,
                <BALL_12 x={this.state.points[12].x} y={this.state.points[12].y} width={ballRad} viewBox={viewBox} key={13} />,
                <BALL_13 x={this.state.points[13].x} y={this.state.points[13].y} width={ballRad} viewBox={viewBox} key={14} />,
                <BALL_14 x={this.state.points[14].x} y={this.state.points[14].y} width={ballRad} viewBox={viewBox} key={15} />,
                <BALL_15 x={this.state.points[15].x} y={this.state.points[15].y} width={ballRad} viewBox={viewBox} key={16} />,
            </>
        );
    }
}

export default Balls;