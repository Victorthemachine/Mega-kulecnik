const Ball = require('../objects/Ball.js');
const Hole = require('../objects/Hole.js');
const Table = require('../objects/Table.js');
const Vector = require('../objects/Vector.js');
const FileManager = require('./../utilities/fileManager');

const parameters = require('./parameters.json');

const table = new Table();
const balls = [];
const pockets = [];
const ballsMoving = {
    moving: [],
    collision: []
}
const faul;
const player1;
const moves;
const canPlayBlack = [];
const winner = []
    //TODO Add check for holes!
    /**
     * Game manager... controls all elements for a game
     * 
     */
module.exports = class Game {

    /**
     * Initializes a game (creates table and balls)
     */
    constructor() {
        this.table = table;
        this.balls = balls;
        if (this.balls.length === 0) {
            this.initBalls();
        }
        this.pockets = pockets;
        if (this.pockets.length === 0) {
            this.initPockets();
        }
        this.ballsMoving = ballsMoving;
        this.player1 = player1;
        this.player1 = true;
        this.faul = faul;
        this.moves = moves;
        this.moves = 1;
        this.canPlayBlack = canPlayBlack;
        this.canPlayBlack = [false, false];
        this.winner = winner;
        this.winner = [false, false];
    }

    /**
     * Checks whether the ball collides with the table.
     * This is accomplished by finding a point on the table. 
     * Using 2 vertical lines to the table connecting two possible points and center of the ball.
     * 
     * Diagram:
     * 
     *                  |
     *                  |
     * -----------------X-------|
     *                  |       |
     *                  |       |
     * -----------------X-------X-------
     *                  |       |
     *                  |       |
     * 
     * @param {Ball} ball 
     * 
     * @returns {Boolean} true  - collision
     *                    false - no collision
     */
    checkCollisionBtT(ball) {
        if (ball.hidden) return false;
        let pointOnTable = { first: { x: 0, y: 0 }, second: { x: 0, y: 0 } };
        switch (table.getBallPositionQuadrant(ball)) {
            case 'LEFT BOTTOM':
                pointOnTable.first = { x: ball.x, y: table.y };
                pointOnTable.second = { x: table.x, y: ball.y };
                break;
            case 'RIGHT BOTTOM':
                pointOnTable.first = { x: ball.x, y: table.y };
                pointOnTable.second = { x: table.width + table.x, y: ball.y };
                break;
            case 'LEFT TOP':
                pointOnTable.first = { x: ball.x, y: table.height };
                pointOnTable.second = { x: table.x, y: ball.y };
                break;
            case 'RIGHT TOP':
                pointOnTable.first = { x: ball.x, y: table.height };
                pointOnTable.second = { x: table.width + table.x, y: ball.y };
                break;
        }
        if (Math.sqrt(Math.pow(ball.x - pointOnTable.first.x, 2) + Math.pow(ball.y - pointOnTable.first.y, 2)) <= ball.radius || Math.sqrt(Math.pow(ball.x - pointOnTable.second.x, 2) + Math.pow(ball.y - pointOnTable.second.y, 2)) <= ball.radius) {
            return true;
        }
        return false;
    }

    /**
     * Gets array of all Ball objects currently in use
     * 
     * @returns {Array} array of all Ball objects
     */
    getBalls() {
        let temp = [];
        balls.forEach(el => {
            if (!el.hidden) temp.push(el);
        })
        return temp;
    }

    /**
     * Currently a dummy method as well.. need to fix it up later
     */
    initTable() {

    }

    /**
     * For now just a dummy method later make sure to adjust x,y <= doesn't matter
     * We already adjust sizes and x/y in updateSizes()
     */
    initBalls() {
        console.log('Initilizing balls...')
        for (let i = 0; i < 16; i++) {
            balls.push(new Ball(i, {
                x: i,
                y: i,
                hidden: false,
            }))
            balls[i].vector = new Vector(i + 2, i, undefined, undefined, {
                owner: balls[i].id
            })
        }
    }

    initPockets() {
        console.log('Initilizing pockets...');
        this.pockets.push(new Hole(i, {
            x: table.x - 11.25 / 2,
            y: table.y - 11.25 / 2,
            radius: 11.25 / 2
        }));
        this.pockets.push(new Hole(i, {
            x: table.x + table.width / 2,
            y: table.y - 12.5 / 2,
            radius: 12.5 / 2
        }));
        this.pockets.push(new Hole(i, {
            x: (table.x + table.width) + 11.25 / 2,
            y: table.y + 11.25 / 2,
            radius: 11.25 / 2
        }));
        this.pockets.push(new Hole(i, {
            x: table.x - 11.25 / 2,
            y: (table.y + table.height) + 11.25 / 2,
            radius: 11.25 / 2
        }));
        this.pockets.push(new Hole(i, {
            x: table.x + table.width / 2,
            y: (table.y + table.height) + 12.5 / 2,
            radius: 12.5 / 2
        }));
        this.pockets.push(new Hole(i, {
            x: table.x + table.width + 11.25 / 2,
            y: table.y + table.height + 11.25 / 2,
            radius: 11.25 / 2
        }));
    }
    checkCollisionBtPs(ball) {
        this.pockets.forEach((el) => {
            if (Math.sqrt(Math.pow(el.x - ball.x, 2) + Math.pow(el.y - ball.y, 2)) <= el.radius) {
                return true;
            }
        });
        return false;
    }
    computeCollisionBtPs(ball) {
            ball.hidden();
        }
        /**
         * Checks if two supplied balls are colliding or not.
         * 
         * @param {Ball} ball_1 
         * @param {Ball} ball_2 
         * 
         * @returns {Boolean} true  - collision
         *                    false - no collision
         */
    checkCollisionBtB(ball_1, ball_2) {
        console.log(`Hidden? ${ball_1.hidden || ball_2.hidden}`);
        if (ball_1.hidden || ball_2.hidden) return false;
        if (Math.sqrt(Math.pow(ball_2.x - ball_1.x, 2) + Math.pow(ball_2.y - ball_1.y, 2)) <= (ball_1.radius + ball_2.radius)) {
            return true;
        }
        return false;
    }

    /**
     * Computes the vector after the collision.
     * 
     * @param {Ball} ball 
     * 
     * @returns {Vector} vector after the collision
     */
    computeBtTCollision(ball) {
        if (ball.hidden) return false;
        let pointOnTable = { first: { x: 0, y: 0 }, second: { x: 0, y: 0 } };
        let quadrant = table.getBallPositionQuadrant(ball);
        switch (quadrant) {
            case 'LEFT BOTTOM':
                pointOnTable.first = { x: ball.x, y: table.y };
                pointOnTable.second = { x: table.x, y: ball.y };
                break;
            case 'RIGHT BOTTOM':
                pointOnTable.first = { x: ball.x, y: table.y };
                pointOnTable.second = { x: table.width + table.x, y: ball.y };
                break;
            case 'LEFT TOP':
                pointOnTable.first = { x: ball.x, y: table.height };
                pointOnTable.second = { x: table.x, y: ball.y };
                break;
            case 'RIGHT TOP':
                pointOnTable.first = { x: ball.x, y: table.height };
                pointOnTable.second = { x: table.width + table.x, y: ball.y };
                break;
        }
        let point;

        if (Math.sqrt(Math.pow(ball.x - pointOnTable.first.x, 2) + Math.pow(ball.y - pointOnTable.first.y, 2)) <= ball.radius) {
            point = pointOnTable.first;
            quadrant = quadrant.split(' ')[1];
        } else if (Math.sqrt(Math.pow(ball.x - pointOnTable.second.x, 2) + Math.pow(ball.y - pointOnTable.second.y, 2)) <= ball.radius) {
            point = pointOnTable.second;
            quadrant = quadrant.split(' ')[0];
        }
        console.log(point);
        console.log(quadrant);
        if (point === undefined) throw new Error('TRIED TO COMPUTE COLLISION BALL TO TABLE BUT POINT IS UNDEFINED');

        let bounceAngle;

        switch (quadrant) {
            case 'LEFT':
                if (90 <= ball.vector.angle <= 180) { //i.e. it's in the second quadrant vector wise
                    bounceAngle = (90 - (ball.vector.angle - 90));
                } else { //i.e. it's in the third quadrant vector wise
                    bounceAngle = 360 - (ball.vector.angle - 180);
                }
                break;
            case 'RIGHT':
                if (0 <= ball.vector.angle <= 90) { //i.e. it's in the first quadrant vector wise
                    bounceAngle = 180 - (90 - (90 - ball.vector.angle));
                } else { //i.e. it's in the fourth quadrant vector wise
                    bounceAngle = 180 + (90 - (90 - (360 - ball.vector.angle)));
                }
                break;
            case 'BOTTOM':
                if (180 <= ball.vector.angle <= 270) { //i.e. it's in the third quadrant vector wise
                    bounceAngle = 2 * (270 - ball.vector.angle) + (90 - (270 - ball.vector.angle));
                } else { //i.e. it's in the fourth quadrant vector wise
                    bounceAngle = 90 - (90 - (360 - ball.vector.angle));
                }
                break;
            case 'TOP':
                if (0 <= ball.vector.angle <= 90) { //i.e. it's in the first quadrant vector wise
                    bounceAngle = 360 - (90 - (90 - ball.vector.angle));
                } else { //i.e. it's in the second quadrant vector wise
                    bounceAngle = 180 + (90 - (ball.vector.angle - 90));
                }
                break;
        }

        ball.vector.setVector(bounceAngle, ball.vector.force);

    }

    computeColisions() {
        if (ballsMoving.collision.lenght === 0) return;
        ballsMoving.collision.forEach(el => {
            let temp = [];
            for (let i in el) {
                temp.push(i);
            }
            temp.length === 1 ? computeBtTCollision(temp[0]) : computeBtBCollision(temp[0], temp[1]);
        });
        ballsMoving.collision.splice(0);
    }
    computeBtBCollision(ball1, ball2) {
        console.log("BtB");
    }

    /**
     * Computes collision of two balls
     * 
     * @param {Ball} ball_1 
     * @param {Ball} ball_2
     */
    /*computeBtBCollision(ball_1, ball_2) {
    
        }*/

    /**
     * Updates sizes based on supplied parameters
     * 
     * @param {JSON} data 
     */
    updateSizes(id, data) {
        this.table.width = (data.height * (224 / 150)) * (224 / 262);
        this.table.height = data.height * 112 / 150;

        const offsetWidth = (data.windowWidth - this.table.width) / 2;
        this.table.x = offsetWidth;
        const offsetHeight = (data.height - this.table.height) / 2;
        this.table.y = offsetHeight;

        this.balls.forEach((el, index) => {
            el.x += offsetWidth;
            el.y += offsetHeight;
            if (index === 0) {
                el.radius = data.radiusWhite;
            } else {
                el.radius = data.radius;
            }
        });

        this.pockets.forEach(el => {
            el.x += offsetWidth;
            el.y += offsetHeight;
            el.radius = el.radius * (this.table.width / 224);
        });

        FileManager.updateGames(id, 'game', {
            table: this.table,
            balls: this.balls
        });
    }

    computeInitialPositions(id) {
        const strictPosArray = [];
        const randomizePosArray = [];

        this.balls[0].x = (this.table.width / 4) + table.x;
        this.balls[0].y = (this.table.height / 2) + this.table.y;

        const somethingLikeTheRadiusButNotQuite = this.balls[1].radius * 0.88;

        const centerBall = {
            x: ((this.table.width / 4) * 3) + this.table.x,
            y: (this.table.height / 2) + this.table.y
        };
        console.log((this.table.height / 2) + this.table.y)
        randomizePosArray.push({
            x: centerBall.x - (4 * somethingLikeTheRadiusButNotQuite),
            y: centerBall.y
        });
        strictPosArray.push(centerBall, {
            x: centerBall.x + (4 * somethingLikeTheRadiusButNotQuite),
            y: centerBall.y + (4 * this.balls[1].radius) / 2
        }, {
            x: centerBall.x + (4 * somethingLikeTheRadiusButNotQuite),
            y: centerBall.y - (4 * this.balls[1].radius) / 2
        });
        randomizePosArray.push({
            x: centerBall.x - (2 * somethingLikeTheRadiusButNotQuite),
            y: centerBall.y + (this.balls[1].radius) / 2,
        }, {
            x: centerBall.x,
            y: centerBall.y + (2 * this.balls[1].radius) / 2
        }, {
            x: centerBall.x + (2 * somethingLikeTheRadiusButNotQuite),
            y: centerBall.y + (this.balls[1].radius) / 2,
        }, {
            x: centerBall.x + (2 * somethingLikeTheRadiusButNotQuite),
            y: centerBall.y + (3 * this.balls[1].radius) / 2,
        }, {
            x: centerBall.x + (4 * somethingLikeTheRadiusButNotQuite),
            y: centerBall.y
        }, {
            x: centerBall.x + (4 * somethingLikeTheRadiusButNotQuite),
            y: centerBall.y + (2 * this.balls[1].radius) / 2,
        }, { //opposite vv
            x: centerBall.x - (2 * somethingLikeTheRadiusButNotQuite),
            y: centerBall.y - (this.balls[1].radius) / 2,
        }, {
            x: centerBall.x,
            y: centerBall.y - (2 * this.balls[1].radius) / 2
        }, {
            x: centerBall.x + (2 * somethingLikeTheRadiusButNotQuite),
            y: centerBall.y - (this.balls[1].radius) / 2,
        }, {
            x: centerBall.x + (2 * somethingLikeTheRadiusButNotQuite),
            y: centerBall.y - (3 * this.balls[1].radius) / 2,
        }, {
            x: centerBall.x + (4 * somethingLikeTheRadiusButNotQuite),
            y: centerBall.y - (2 * this.balls[1].radius) / 2,
        }, {
            x: centerBall.x + (4 * somethingLikeTheRadiusButNotQuite),
            y: centerBall.y - (2 * this.balls[1].radius) / 2,
        });

        //Adjust fixed positions
        this.balls[8].x = strictPosArray[0].x;
        this.balls[8].y = strictPosArray[0].y;

        const ballsToGoThrough = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15];
        if ((Math.random() * 10) % 2 === 0) {
            console.log('EVEN');
            let nominee = Math.floor(Math.random() * 7);
            console.log(nominee);
            this.balls[ballsToGoThrough[nominee]].x = strictPosArray[1].x;
            this.balls[ballsToGoThrough[nominee]].y = strictPosArray[1].y;
            ballsToGoThrough.splice(nominee, 1);
            console.log(ballsToGoThrough);
            nominee = Math.floor(Math.random() * (ballsToGoThrough.length - 6) + 6);
            console.log(nominee);
            this.balls[ballsToGoThrough[nominee]].x = strictPosArray[2].x;
            this.balls[ballsToGoThrough[nominee]].y = strictPosArray[2].y;
            ballsToGoThrough.splice(nominee, 1);
            console.log(ballsToGoThrough);
        } else {
            console.log('ODD');
            let nominee = Math.floor(Math.random() * (ballsToGoThrough.length - 7) + 7);
            console.log(nominee);
            this.balls[ballsToGoThrough[nominee]].x = strictPosArray[1].x;
            this.balls[ballsToGoThrough[nominee]].y = strictPosArray[1].y;
            ballsToGoThrough.splice(nominee, 1);
            console.log(ballsToGoThrough);
            nominee = Math.floor(Math.random() * 7);
            console.log(nominee);
            this.balls[ballsToGoThrough[nominee]].x = strictPosArray[2].x;
            this.balls[ballsToGoThrough[nominee]].y = strictPosArray[2].y;
            ballsToGoThrough.splice(nominee, 1);
            console.log(ballsToGoThrough);
        }
        console.log(ballsToGoThrough);
        let lenghtOfArray = ballsToGoThrough.length;
        for (let i = 0; i < lenghtOfArray; i++) {
            let nominee = Math.floor(Math.random() * (ballsToGoThrough.length - 1));
            console.log(`Lenght: ${ballsToGoThrough.length}, Random: ${nominee}`);
            console.log(ballsToGoThrough);
            console.log(randomizePosArray[i]);
            console.log(this.balls[nominee]);
            this.balls[ballsToGoThrough[nominee]].x = randomizePosArray[i].x;
            this.balls[ballsToGoThrough[nominee]].y = randomizePosArray[i].y;
            ballsToGoThrough.splice(nominee, 1);
        }
        FileManager.updateGames(id, 'balls', this.balls);
        let response = {};
        this.balls.forEach((el, index) => {
            response[index] = {
                x: el.x < (this.table.width / 2 + table.x) ? -el.x - el.radius : el.x / 2 - 4 * el.radius,
                y: -el.y
            }
        });
        console.log(response);
        return response;
    }
    areBallsStill() {
        areStill = true;
        balls.forEach((el, index) => {
            if (!el.vector.force === 0) {
                this.ballsMoving.moving.push(index)
                areStill = false
            }

        });
        return areStill;
    }
    blackHandler() {
        if (this.balls[8].hidden) {
            if (this.player1) {
                if (this.canPlayBlack[0]) {
                    winner[0] = true;
                } else {
                    winner[1] = true;
                }
            } else {
                if (this.canPlayBlack[1]) {
                    winner[1] = true;
                } else {
                    winner[0] = true;
                }
            }
        }
    }
    moveCalculater() {
        if (this.faul) {
            this.player1 = !this.player1;
            this.moves = 2;
        } else {
            this.moves--;
            if (this.moves < 1) {
                this.player1 = !this.player1;
            }
        }
    }
    gameWizard(Vector) {

        this.faul = true;

        this.balls[0].vector = Vector;
        let timestemp = 0;
        while (!this.areBallsStill) {
            timestemp++;
            this.computeColisions();
            if (this.ballsMoving.moving.length > 1) {
                this.faul = false;
            }
            for (let i = 0; i < this.ballsMoving.moving.length; i++) {
                let temp = this.balls[this.ballsMoving.moving[i]];
                temp.x += temp.vector.x;
                temp.y += temp.vector.y;
                temp.vector.force *= parameters.tableConstantDeceleration;
                if (this.checkCollisionBtT(temp)) {
                    ballsMoving.collision.push({ temp });
                }
                this.balls.forEach((el) => {
                    if (this.checkCollisionBtB(temp, el)) {
                        if (!this.ballsMoving.collision.find(elem => {
                                return Object.is(elem, { el, temp });
                            })) {
                            this.ballsMoving.collision.push({ temp, el });
                        }
                    }
                });

            }
            console.log("*===================================*")
            console.log(timestemp);
            console.log(this.ballsMoving);
        }
        this.blackHandler();
        this.moveCalculater();

    }
}