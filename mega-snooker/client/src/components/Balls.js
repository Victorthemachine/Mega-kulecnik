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
//This is the game secret or otherwise referenced as game id
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
                { x: 0, y: 0, hidden: 'visible' },
                { x: 0, y: 0, hidden: 'visible' },
                { x: 0, y: 0, hidden: 'visible' },
                { x: 0, y: 0, hidden: 'visible' },
                { x: 0, y: 0, hidden: 'visible' },
                { x: 0, y: 0, hidden: 'visible' },
                { x: 0, y: 0, hidden: 'visible' },
                { x: 0, y: 0, hidden: 'visible' },
                { x: 0, y: 0, hidden: 'visible' },
                { x: 0, y: 0, hidden: 'visible' },
                { x: 0, y: 0, hidden: 'visible' },
                { x: 0, y: 0, hidden: 'visible' },
                { x: 0, y: 0, hidden: 'visible' },
                { x: 0, y: 0, hidden: 'visible' },
                { x: 0, y: 0, hidden: 'visible' },
                { x: 0, y: 0, hidden: 'visible' },
                { x: 0, y: 0, hidden: 'visible' },
                { x: 0, y: 0, hidden: 'visible' },
                { x: 0, y: 0, hidden: 'visible' }
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
        setTimeout(function() {
            API.gameCheckForUpdatedPositions(secret.id).then(res => {
                if (res.status === 'doUpdate') {
                    API.gameGetNewPositions(secret.id, undefined).then(result => {
                        console.log('=========================================================');
                        console.log(result);
                        console.log('=========================================================');
                        //for now just a trial method
                        const test = {
                            "balls": [{
                                "1": [{
                                        "0": {
                                            "x": "0",
                                            "y": "0",
                                            "doHide": false,
                                            "angle": 97
                                        }
                                    },
                                    {
                                        "7": {
                                            "x": "578",
                                            "y": "-801",
                                            "doHide": true,
                                            "angle": 157
                                        }
                                    }
                                ],
                                "2": [{
                                    "2": {
                                        "x": "100",
                                        "y": "-100",
                                        "doHide": true,
                                        "angle": 157
                                    }
                                }]
                            }],
                            "player": 1,
                            "win": [
                                false,
                                false
                            ]
                        }

                        let counter = 1;
                        let temp = this.state.points;
                        const updates = [];
                        test.balls.forEach(el => {
                            for (let i in el) {
                                console.log(temp);
                                if (parseInt(i) === counter) {
                                    console.log(el);
                                    console.log(i);
                                    console.log(el[i]);
                                    el[i].forEach(elem => {
                                        console.log(`Why are you not working: ${Object.keys(elem)[0]}`);
                                        console.log(elem);
                                        temp[parseInt(Object.keys(elem)[0])].x = elem[Object.keys(elem)[0]].x;
                                        temp[parseInt(Object.keys(elem)[0])].y = elem[Object.keys(elem)[0]].y;
                                        temp[parseInt(Object.keys(elem)[0])].hidden = elem[Object.keys(elem)[0]].doHide ? 'hidden' : 'visible';
                                    });
                                    updates.push(JSON.parse(JSON.stringify(temp)));
                                    console.log(updates[updates.length - 1])
                                    counter++;
                                } else {
                                    throw Error('Incorrect JSON received from API when attempting to update positions');
                                }
                            }
                        });
                        counter = 0;
                        console.log(updates);
                        //const prevState = JSON.parse(JSON.stringify(this.state));
                        let scheduleUpdates = setInterval(function() {
                            console.log(`Interval initiated;\nCounter: ${counter}`);
                            this.setState({ points: updates[counter] })
                            if (updates.length - 1 === counter) {
                                clearInterval(scheduleUpdates);
                                return;
                            }
                            counter++;
                        }.bind(this), 2000)
                    })
                }
            })
        }.bind(this), 2000);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.state);
        /*        console.log('Updating the component Balls!');
                let changeThese = [];
                console.log(prevState);
                prevState.points.forEach((a, i) => {
                    let condition = a.x !== this.state.points[i].x || a.y !== this.state.points[i].y;
                    if (condition) {
                        console.log(`Element with index: ${i} needs to be changed!`);
                        changeThese.push(i);
                    }
                });
                console.log(changeThese);
                if (changeThese.length !== 0) {
                    changeThese.forEach(el => {
                        document.getElementById(`${el}`).style.transform =
                            `translate(${Math.abs(prevState.points[el].x - this.state.points[el].x)}px, ${Math.abs(prevState.points[el].y - this.state.points[el].y)}px)`;
                    })
                    this.setState(this.state);
                }*/
    }

    /**
     * Needs to be implemented with event listener.
     * Event should fire each time player interacts.
     */
    checkForUpdates() {
        API.gameCheckForUpdatedPositions(secret.id).then(res => {
            if (res.status === 'doUpdate') {
                API.gameGetNewPositions(secret.id, undefined).then(result => {
                    console.log('=========================================================');
                    console.log(result);
                    console.log('=========================================================');
                    //for now just a trial method
                    const test = {
                        "balls": [{
                            "1": [{
                                    "0": {
                                        "x": "5",
                                        "y": "80",
                                        "doHide": false,
                                        "angle": 97
                                    }
                                },
                                {
                                    "7": {
                                        "x": "578",
                                        "y": "-801",
                                        "doHide": true,
                                        "angle": 157
                                    }
                                }
                            ]
                        }],
                        "player": 1,
                        "win": false
                    }

                    let counter = 1;
                    test.balls.forEach(el => {
                        let temp = this.state.points;
                        for (let i in el) {
                            if (parseInt(i) === counter) {
                                el.i.forEach(elem => {
                                    console.log(elem);
                                    temp[parseInt(elem)].x = elem.x;
                                    temp[parseInt(elem)].y = elem.y;
                                });
                            } else {
                                throw Error('Incorrect JSON received from API when attempting to update positions');
                            }
                            setTimeout(function() {
                                this.setState({ points: temp })
                            }, 500);
                        }
                    });
                })
            }
        })
    }

    render() {
        return ( <
            >
            <
            BALL_0 id = { 0 }
            x = { this.state.points[0].x }
            y = { this.state.points[0].y }
            style = { `visibility: ${this.state.points[0].hidden}` }
            width = { whiteRad }
            viewBox = { viewBox }
            key = { 1 }
            />, <
            BALL_1 id = { 1 }
            x = { this.state.points[1].x }
            y = { this.state.points[1].y }
            style = { `visibility: ${this.state.points[1].hidden}` }
            width = { ballRad }
            viewBox = { viewBox }
            key = { 2 }
            />, <
            BALL_2 id = { 2 }
            x = { this.state.points[2].x }
            y = { this.state.points[2].y }
            style = { `visibility: ${this.state.points[2].hidden}` }
            width = { ballRad }
            viewBox = { viewBox }
            key = { 3 }
            />, <
            BALL_3 id = { 3 }
            x = { this.state.points[3].x }
            y = { this.state.points[3].y }
            style = { `visibility: ${this.state.points[3].hidden}` }
            width = { ballRad }
            viewBox = { viewBox }
            key = { 4 }
            />, <
            BALL_4 id = { 4 }
            x = { this.state.points[4].x }
            y = { this.state.points[4].y }
            style = { `visibility: ${this.state.points[4].hidden}` }
            width = { ballRad }
            viewBox = { viewBox }
            key = { 5 }
            />, <
            BALL_5 id = { 5 }
            x = { this.state.points[5].x }
            y = { this.state.points[5].y }
            style = { `visibility: ${this.state.points[5].hidden}` }
            width = { ballRad }
            viewBox = { viewBox }
            key = { 6 }
            />, <
            BALL_6 id = { 6 }
            x = { this.state.points[6].x }
            y = { this.state.points[6].y }
            style = { `visibility: ${this.state.points[6].hidden}` }
            width = { ballRad }
            viewBox = { viewBox }
            key = { 7 }
            />, <
            BALL_7 id = { 7 }
            x = { this.state.points[7].x }
            y = { this.state.points[7].y }
            style = { `visibility: ${this.state.points[7].hidden}` }
            width = { ballRad }
            viewBox = { viewBox }
            key = { 8 }
            />, <
            BALL_8 id = { 8 }
            x = { this.state.points[8].x }
            y = { this.state.points[8].y }
            style = { `visibility: ${this.state.points[8].hidden}` }
            width = { ballRad }
            viewBox = { viewBox }
            key = { 9 }
            />, <
            BALL_9 id = { 9 }
            x = { this.state.points[9].x }
            y = { this.state.points[9].y }
            style = { `visibility: ${this.state.points[9].hidden}` }
            width = { ballRad }
            viewBox = { viewBox }
            key = { 10 }
            />, <
            BALL_10 id = { 10 }
            x = { this.state.points[10].x }
            y = { this.state.points[10].y }
            style = { `visibility: ${this.state.points[10].hidden}` }
            width = { ballRad }
            viewBox = { viewBox }
            key = { 11 }
            />, <
            BALL_11 id = { 11 }
            x = { this.state.points[11].x }
            y = { this.state.points[11].y }
            style = { `visibility: ${this.state.points[11].hidden}` }
            width = { ballRad }
            viewBox = { viewBox }
            key = { 12 }
            />, <
            BALL_12 id = { 12 }
            x = { this.state.points[12].x }
            y = { this.state.points[12].y }
            style = { `visibility: ${this.state.points[12].hidden}` }
            width = { ballRad }
            viewBox = { viewBox }
            key = { 13 }
            />, <
            BALL_13 id = { 13 }
            x = { this.state.points[13].x }
            y = { this.state.points[13].y }
            style = { `visibility: ${this.state.points[13].hidden}` }
            width = { ballRad }
            viewBox = { viewBox }
            key = { 14 }
            />, <
            BALL_14 id = { 14 }
            x = { this.state.points[14].x }
            y = { this.state.points[14].y }
            style = { `visibility: ${this.state.points[14].hidden}` }
            width = { ballRad }
            viewBox = { viewBox }
            key = { 15 }
            />, <
            BALL_15 id = { 15 }
            x = { this.state.points[15].x }
            y = { this.state.points[15].y }
            style = { `visibility: ${this.state.points[15].hidden}` }
            width = { ballRad }
            viewBox = { viewBox }
            key = { 16 }
            />, <
            />
        );
    }
}

export default Balls;