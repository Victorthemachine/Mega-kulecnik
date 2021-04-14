import React, { Component } from 'react';
import { withRouter } from 'react-router';
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

const viewBox = [0, 0, 100, 100];
const ballRad = 57 * (window.innerHeight / 1120) * 2;
const whiteRad = 62 * (window.innerHeight / 1120) * 2;
const points = [];
//This is the game secret or otherwise referenced as game id
let isFinished = false;

/**
 * All balls are here. They are currently being rendered with positions from this.API so don't forget to turn it on.
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
        this.API = props.props;
    }

    componentDidMount() {
        this.API.whiteBall.radius = whiteRad / 2;
        const { activeGame } = this.API;
        this.API.connectSocket().then(socket => {
            socket.onmessage = function (event) {
                if (isFinished === true) return;
                let serverInstructions = event.data;
                let payload = null;
                if (serverInstructions.startsWith('Render')) {
                    payload = JSON.parse(serverInstructions.slice(7));
                    serverInstructions = 'Render';
                }
                if (serverInstructions.startsWith('Win')) {
                    payload = JSON.parse(serverInstructions.slice(4));
                    serverInstructions = 'Win';
                }
                if (serverInstructions.startsWith('Init')) {
                    payload = JSON.parse(serverInstructions.slice(5));
                    serverInstructions = 'Init';
                }
                switch (serverInstructions) {
                    case 'Start game':
                        this.startGame().then(success => {
                            if (success) {
                                socket.send(this.prepareMessage('Start'));
                            }
                        });
                        break;
                    case 'Init':
                        for (let i = 0; i < 16; i++) {
                            points.push(payload[i]);
                        }
                        this.setState({ points: points })
                        socket.send(this.prepareMessage('Ready'));
                        break;
                    case `Play move:${activeGame.myIndex}`:
                        this.API.whiteBall = {
                            x: this.state.points[0].x,
                            y: this.state.points[0].y,
                            radius: whiteRad / 2,
                            cue: true
                        };
                        this.playMove().then(obj => {
                            socket.send(this.prepareMessage('Played:' + JSON.stringify(obj)));
                            this.API.whiteBall.cue = false;
                        });
                        break;
                    case 'Render':
                        this._renderMoves(payload).then(success => {
                            if (success) {
                                socket.send(this.prepareMessage('Ready'));
                            }
                        });
                        break;
                    case 'Win':
                        this.isReadyToEnd().then(ready => {
                            socket.send(this.prepareMessage('Finished'));
                            this.API.disconnectSocket(socket);
                            this.API.winnerWinnerChickenDinner = payload;
                            isFinished = true;
                            this.props.history.push('/end');
                        });
                        break;
                    default:
                        break;
                }
            }.bind(this);
        });
    }

    isReadyToEnd() {
        return new Promise(resolve => {
            resolve(true);
        });
    }

    prepareMessage(content) {
        return `${this.API.activeGame.serverToken}|${this.API.activeGame.id}|${content}`;
    }

    startGame() {
        return new Promise(resolve => {
            this.API.gameUpdatePositions({
                "height": window.innerHeight - 50,
                "windowWidth": window.innerWidth,
                "radius": ballRad / 2,
                "radiusWhite": whiteRad / 2
            }).then(fin => {
                resolve(true);
            });
        })
    }

    playMove() {
        return new Promise(resolve => {
            window.addEventListener('click', function handleMouseClick(event) {
                event.currentTarget.removeEventListener(event.type, handleMouseClick);
                const { pageX, pageY } = event;
                const ballx = (this.API.whiteBall.x + window.innerWidth / 2) + whiteRad / 2;
                let rotatedPageY = window.innerHeight - pageY;
                let bally = 0;
                if (Math.abs(Math.abs(this.API.whiteBall.y) - rotatedPageY) <= 60) {
                    bally = pageY + 100;
                } else {
                    bally = ((Math.abs(this.API.whiteBall.y) + whiteRad / 2));
                }
                resolve({
                    cursor: {
                        x: pageX,
                        y: rotatedPageY
                    },
                    cueBall: {
                        x: ballx,
                        y: bally
                    }
                });
            }.bind(this));
        });
    }
    _renderMoves(payload) {
        return new Promise(resolve => {
            let counter = 1;
            let temp = this.state.points;
            const updates = [];
            payload.balls.forEach(el => {
                for (let i in el) {
                    if (parseInt(i) === counter) {
                        el[i].forEach(elem => {
                            temp[parseInt(Object.keys(elem)[0])].x = elem[Object.keys(elem)[0]].x;
                            temp[parseInt(Object.keys(elem)[0])].y = elem[Object.keys(elem)[0]].y;
                            temp[parseInt(Object.keys(elem)[0])].hidden = elem[Object.keys(elem)[0]].doHide ? 'hidden' : 'visible';
                        });
                        updates.push(JSON.parse(JSON.stringify(temp)));
                        counter++;
                    } else {
                        throw Error('Incorrect JSON received from this.API when attempting to update positions');
                    }
                }
            });
            counter = 0;
            let scheduleUpdates = setInterval(function () {
                this.setState({ points: updates[counter] })
                if (updates.length - 1 === counter) {
                    clearInterval(scheduleUpdates);
                    resolve(true);
                    return;
                }
                counter++;
            }.bind(this), 20)
        });
    }

    render() {
        return (
            <>
                <BALL_0 id={0} x={this.state.points[0].x} y={this.state.points[0].y} style={{ visibility: `${this.state.points[0].hidden}` }} width={whiteRad} viewBox={viewBox} key={1} />,
                <BALL_1 id={1} x={this.state.points[1].x} y={this.state.points[1].y} style={{ visibility: `${this.state.points[1].hidden}` }} width={ballRad} viewBox={viewBox} key={2} />,
                <BALL_2 id={2} x={this.state.points[2].x} y={this.state.points[2].y} style={{ visibility: `${this.state.points[2].hidden}` }} width={ballRad} viewBox={viewBox} key={3} />,
                <BALL_3 id={3} x={this.state.points[3].x} y={this.state.points[3].y} style={{ visibility: `${this.state.points[3].hidden}` }} width={ballRad} viewBox={viewBox} key={4} />,
                <BALL_4 id={4} x={this.state.points[4].x} y={this.state.points[4].y} style={{ visibility: `${this.state.points[4].hidden}` }} width={ballRad} viewBox={viewBox} key={5} />,
                <BALL_5 id={5} x={this.state.points[5].x} y={this.state.points[5].y} style={{ visibility: `${this.state.points[5].hidden}` }} width={ballRad} viewBox={viewBox} key={6} />,
                <BALL_6 id={6} x={this.state.points[6].x} y={this.state.points[6].y} style={{ visibility: `${this.state.points[6].hidden}` }} width={ballRad} viewBox={viewBox} key={7} />,
                <BALL_7 id={7} x={this.state.points[7].x} y={this.state.points[7].y} style={{ visibility: `${this.state.points[7].hidden}` }} width={ballRad} viewBox={viewBox} key={8} />,
                <BALL_8 id={8} x={this.state.points[8].x} y={this.state.points[8].y} style={{ visibility: `${this.state.points[8].hidden}` }} width={ballRad} viewBox={viewBox} key={9} />,
                <BALL_9 id={9} x={this.state.points[9].x} y={this.state.points[9].y} style={{ visibility: `${this.state.points[9].hidden}` }} width={ballRad} viewBox={viewBox} key={10} />,
                <BALL_10 id={10} x={this.state.points[10].x} y={this.state.points[10].y} style={{ visibility: `${this.state.points[10].hidden}` }} width={ballRad} viewBox={viewBox} key={11} />,
                <BALL_11 id={11} x={this.state.points[11].x} y={this.state.points[11].y} style={{ visibility: `${this.state.points[11].hidden}` }} width={ballRad} viewBox={viewBox} key={12} />,
                <BALL_12 id={12} x={this.state.points[12].x} y={this.state.points[12].y} style={{ visibility: `${this.state.points[12].hidden}` }} width={ballRad} viewBox={viewBox} key={13} />,
                <BALL_13 id={13} x={this.state.points[13].x} y={this.state.points[13].y} style={{ visibility: `${this.state.points[13].hidden}` }} width={ballRad} viewBox={viewBox} key={14} />,
                <BALL_14 id={14} x={this.state.points[14].x} y={this.state.points[14].y} style={{ visibility: `${this.state.points[14].hidden}` }} width={ballRad} viewBox={viewBox} key={15} />,
                <BALL_15 id={15} x={this.state.points[15].x} y={this.state.points[15].y} style={{ visibility: `${this.state.points[15].hidden}` }} width={ballRad} viewBox={viewBox} key={16} />,
            </>
        );
    }
}

export default withRouter(Balls);