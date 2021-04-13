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
const canPlayBlack = [];
const winner = []
const lastHole = [];
const playingFull = [];
const ballsRemaining = [];
let moveX;
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
        this.player = 1;
        this.foul = undefined;
        this.moves = 1;
        this.canPlayBlack = canPlayBlack;
        this.canPlayBlack = [false, false];
        this.winner = winner;
        this.winner = [false, false];
        this.lastHole = lastHole;
        this.playingFull = playingFull;
        this.playingFull = [false, false];
        this.ballsRemaining = ballsRemaining;
        this.ballsRemaining = [7, 7];
        this.blackHole = undefined;
    }

    run(id, cueCords) {

        }
        /**
         * 
         * @param {Ball} ball 
         * 
         * @returns {Boolean} true  - collision
         *                    false - no collision
         */
        /*checkCollisionBtT(ball) {
            if (ball.hidden) return false;
            if (this.hittingLeft(ball)) {
                if (!(this.pocketChecker(ball, 0) || this.pocketChecker(ball, 3))) {
                    return true;
                }

            }
            if (this.hittingRight(ball)) {
                if (((ball.vector.angle < (Math.PI / 2)) || (ball.vector.angle > (3 * Math.PI / 2)))) {
                    if (!(this.pocketChecker(ball, 2) || this.pocketChecker(ball, 5))) {
                        return true;
                    }

                }
            }
            if (this.hittingBottom(ball)) {
                if (!(this.pocketChecker(ball, 0) || this.pocketChecker(ball, 1) || this.pocketChecker(ball, 2))) {
                    return true;

                }
            }
            if (this.hittingTop(ball)) {
                if (!(this.pocketChecker(ball, 3) || this.pocketChecker(ball, 4) || this.pocketChecker(ball, 5))) {
                    return true;
                }

            }
            return false;
        }*/
    hittingLeft(ball) {
        return ((ball.x - (ball.radius / 2)) <= this.table.x && ball.vector.angle > (Math.PI / 2) && ball.vector.angle < (3 * Math.PI / 2)) && (!(this.pocketChecker(ball, 0) || this.pocketChecker(ball, 3)));
    }

    hittingRight(ball) {
        return (((ball.x + (ball.radius / 2)) >= (this.table.width + this.table.x)) && (((ball.vector.angle < (Math.PI / 2)) || (ball.vector.angle > (3 * Math.PI / 2))))) && (!(this.pocketChecker(ball, 2) || this.pocketChecker(ball, 5)));

    }

    hittingBottom(ball) {
        return ((ball.y - (ball.radius / 2)) <= this.table.y && ball.vector.angle > Math.PI && ball.vector.angle < 2 * Math.PI) && (!(this.pocketChecker(ball, 2) || this.pocketChecker(ball, 1) || this.pocketChecker(ball, 0)));

    }

    hittingTop(ball) {
        return ((ball.y + (ball.radius / 2)) >= (this.table.height + this.table.y) && ball.vector.angle > 0 && ball.vector.angle < Math.PI) && (!(this.pocketChecker(ball, 3) || this.pocketChecker(ball, 4) || this.pocketChecker(ball, 5)));
    }

    pocketChecker(ball, pocketId) {
            /*let help1;
            let help2;
            help1 = new Vector(ball.x, ball.y, this.pockets[pocketId].x, this.pockets[pocketId].y);
            if (this.getSize(help1) > this.pockets[pocketId].radius + ball.radius / 2) return false;
            switch (pocketId) {
                case 0:
                    console.log(ball.vector.angle * 180 / Math.PI);
                    console.log(help1.angle * 180 / Math.PI);
                    if (Math.abs(ball.vector.angle - help1.angle) < Math.PI) {
                        return true;
                    }
                    break;
                case 1:
                    if (Math.abs(ball.vector.angle - help1.angle) < Math.PI) {
                        return true;
                    }
                    break;
                case 2:
                    ball.vector.angle > Math.PI ? help1.angle < Math.PI ? help1.angle += 2 * Math.PI : help1.angle = help1.angle : help2.angle > Math.PI ? help2.angle -= 2 * Math.PI : help2.angle = help2.angle;
                    if (ball.vector.angle >= help1.angle && ball.vector.angle <= help2.angle) {
                        return true;
                    }
                    break;
                case 3:
                    if (ball.vector.angle <= help1.angle && ball.vector.angle >= help2.angle) {
                        return true;
                    }
                    break;
                case 4:
                    if (ball.vector.angle <= help1.angle && ball.vector.angle >= help2.angle) {
                        return true;
                    }
                    break;
                case 5:
                    ball.vector.angle < Math.PI ? help1.angle > Math.PI ? help1.angle -= 2 * Math.PI : help1.angle = help1.angle : help2.angle < Math.PI ? help2.angle += 2 * Math.PI : help2.angle = help2.angle;
                    if (ball.vector.angle >= help1.angle && ball.vector.angle <= help2.angle) {
                        return true;
                    }
                    break;
            }*/
            switch (pocketId) {
                case 0:
                    if (ball.x <= this.pockets[pocketId].x + this.pockets[pocketId].radius && ball.y <= this.pockets[pocketId].y + this.pockets[pocketId].radius) {
                        return true;
                    }
                    break;
                case 1:
                    if (ball.x - 0 >= this.pockets[pocketId].x - this.pockets[pocketId].radius && ball.x + 0 <= this.pockets[pocketId].x + this.pockets[pocketId].radius) {
                        return true;
                    }
                    break;
                case 2:
                    if (ball.x - 0 >= this.pockets[pocketId].x + this.pockets[pocketId].radius && ball.y - 0 <= this.pockets[pocketId].y + this.pockets[pocketId].radius) {
                        return true;
                    }
                    break;
                case 3:
                    if (ball.x - 0 <= this.pockets[pocketId].x + this.pockets[pocketId].radius && ball.y + 0 >= this.pockets[pocketId].y - this.pockets[pocketId].radius) {
                        return true;
                    }
                    break;
                case 4:
                    if (ball.x - 0 >= this.pockets[pocketId].x - this.pockets[pocketId].radius && ball.x + 0 <= this.pockets[pocketId].x + this.pockets[pocketId].radius) {
                        return true;
                    }
                    break;
                case 5:
                    if (ball.x + 0 >= this.pockets[pocketId].x - this.pockets[pocketId].radius && ball.y + 0 >= this.pockets[pocketId].y - this.pockets[pocketId].radius) {
                        return true;
                    }
                    break;

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
                x: 0,
                y: 0,
                hidden: false,
            }))
            balls[i].vector = new Vector(0, 0, 0, 0, {
                owner: balls[i].id
            })
        }
    }

    initPockets() {
        console.log('Initilizing pockets...');
        this.pockets.push(new Hole(0, {
            x: this.table.x,
            y: this.table.y,
            radius: 11.25 / 4
        }));
        this.pockets.push(new Hole(1, {
            x: this.table.x + this.table.width / 2,
            y: this.table.y,
            radius: 12.5 / 4
        }));
        this.pockets.push(new Hole(2, {
            x: (this.table.x + this.table.width),
            y: this.table.y,
            radius: 11.25 / 4
        }));
        this.pockets.push(new Hole(3, {
            x: this.table.x,
            y: (this.table.y + this.table.height),
            radius: 11.25 / 4
        }));
        this.pockets.push(new Hole(4, {
            x: this.table.x + (this.table.width / 2),
            y: (this.table.y + this.table.height),
            radius: 12.5 / 4
        }));
        this.pockets.push(new Hole(5, {
            x: this.table.x + this.table.width,
            y: this.table.y + this.table.height,
            radius: 11.25 / 2
        }));
    }
    checkAndComputeCollisionBtPs(ball) {
            this.pockets.forEach((el, index) => {
                if (!el.hidden) {
                    if (Math.pow(el.x - ball.x, 2) + Math.pow(el.y - ball.y, 2) <= el.radius * el.radius) {
                        this.lastHole[this.player] = index;
                        ball.hidden = true;
                        ball.vector.force = 0;
                        if (ball.id != 0 && ball.id != 8) {
                            if (!this.playingFull[0] && !this.playingFull[1]) {
                                if (ball.id < 8) {
                                    this.playingFull[this.player - 1] = true;

                                } else {
                                    try {
                                        this.playingFull[this.player - 2] = true;
                                    } catch (ex) {
                                        this.playingFull[this.player] = true;
                                    }
                                }
                                this.ballsRemaining[this.player - 1]--;

                            } else {
                                if (ball.id < 8) {
                                    if (this.playingFull[0]) {
                                        this.ballsRemaining[0]--;
                                    } else {
                                        this.ballsRemaining[1]--;
                                    }
                                } else {
                                    if (this.playingFull[0]) {
                                        this.ballsRemaining[1]--;
                                    } else {
                                        this.ballsRemaining[0]--;
                                    }
                                }
                            }
                        } else {
                            if (ball.id === 8) {
                                this.blackHole = index;
                            }
                        }
                        return true;
                    }
                }
            });
            return false;
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
        if (ball_1.hidden || ball_2.hidden) return false;
        if (Math.pow(ball_2.x - ball_1.x, 2) + Math.pow(ball_2.y - ball_1.y, 2) <= (Math.pow(((ball_1.radius + ball_2.radius) / 2), 2))) {
            let help1 = new Vector(ball_1.x, ball_1.y, ball_2.x, ball_2.y);
            let help2 = new Vector(ball_2.x, ball_2.y, ball_1.x, ball_1.y);
            if (ball_1.vector.angle !== null) {
                if (Math.abs(ball_1.vector.angle - help1.angle) > (Math.PI)) {
                    ball_1.vector.angle < help1.angle ? ball_1.vector.angle += 2 * Math.PI : help1.angle += 2 * Math.PI;
                }
            } else {
                ball_1.vector.angle = 20000;
            }
            if (ball_2.vector.angle !== null) {
                if (Math.abs(ball_2.vector.angle - help2.angle) > (Math.PI)) {
                    ball_2.vector.angle < help2.angle ? ball_2.vector.angle += 2 * Math.PI : help2.angle += 2 * Math.PI;
                }
            } else {
                ball_2.vector.angle = 20000;
            }
            if (Math.abs(ball_1.vector.angle - help1.angle) < (Math.PI / 2) || Math.abs(ball_2.vector.angle - help2.angle) < (Math.PI / 2)) {
                if (ball_1.vector.angle === 20000) ball_1.vector.angle = null;
                if (ball_2.vector.angle === 20000) ball_1.vector.angle = null;
                if (ball_1.vector.angle > 2 * Math.PI) ball_1.vector.angle -= 2 * Math.PI;
                if (ball_2.vector.angle > 2 * Math.PI) ball_2.vector.angle -= 2 * Math.PI;
                return true;
            }
        }
        if (ball_1.vector.angle === 20000) ball_1.vector.angle = null;
        if (ball_2.vector.angle === 20000) ball_1.vector.angle = null;
        if (ball_1.vector.angle > 2 * Math.PI) ball_1.vector.angle -= 2 * Math.PI;
        if (ball_2.vector.angle > 2 * Math.PI) ball_2.vector.angle -= 2 * Math.PI;
        return false;

    }
    computeAngle(vector) {
            if (vector.y >= 0) {
                return Math.acos((vector.x) / (this.getSize(vector)));
            }
            return Math.PI + Math.PI - Math.acos((vector.x) / (this.getSize(vector)));
        }
        /**
         * Sets the force and adjusts other parameters accordingly
         * 
         * @param {Number} force
         */
    setForce(vector, force) {
            if (force < 0) throw new Error('FORCE CANNOT BE NEGATIVE');
            vector.force = force;
            if (force === 0) {
                vector.x = 0;
                vector.y = 0;
                return;
            }
            let adjustParams = this.convertForce(vector);
            vector.x = adjustParams.x;
            vector.y = adjustParams.y;
        }
        /**
         * 
         * @param {Number} angle 
         * @param {Number} force 
         */
    setVector(vector, angle, force) {
            vector.angle = angle;
            this.setForce(vector, force);
        }
        /**
         * Private function
         * 
         * Convert force to X and Y cordinates
         * 
         * @returns {JSON} X,Y returns { x: something, y: something }
         */
    convertForce(vector) {
        let answer = {};
        answer.x = vector.force * Math.cos(vector.angle);
        answer.y = vector.force * Math.sin(vector.angle);
        return answer;
    }

    /**
     * Computes the size of the vector
     * 
     * @returns {Number} size
     */
    getSize(vector) {
        return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
    }

    /**
     * Gets angle between the two vectors
     * 
     * @param {Vector} vector
     * 
     * @returns {Number} degrees
     */
    getAngle(vector1, vector2) {
        return Math.acos((vector1.x * vector2.x + vector1.y * vector2.y) / (this.getSize(vector1) * this.getSize(vector2)));
    }

    /**
     * 
     * @param {Vector} vector 
     */
    vectorAddition(vector1, vector2) {
        vector1.x += vector2.x;
        vector1.y += vector2.y;
        vector1.angle = this.computeAngle(vector1);
        vector1.force += vector2.force;
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
        let useTheForce = ball.vector.force;
        if (this.hittingRight(ball)) {
            ball.vector.x = -ball.vector.x;
            ball.vector.y = ball.vector.y;
            ball.vector.angle > Math.PI ? ball.vector.angle = 2 * Math.PI - (ball.vector.angle - Math.PI) : ball.vector.angle = (Math.PI - ball.vector.angle);
            ball.vector.force = useTheForce;
            this.forceControl(ball.vector);

        }
        if (this.hittingLeft(ball)) {
            ball.vector.x = -ball.vector.x;
            ball.vector.y = ball.vector.y;
            ball.vector.angle > Math.PI ? ball.vector.angle = Math.PI + (-ball.vector.angle + 2 * Math.PI) : ball.vector.angle = Math.PI - ball.vector.angle;
            ball.vector.force = useTheForce;
            this.forceControl(ball.vector);

        }
        if (this.hittingBottom(ball)) {
            ball.vector.x = ball.vector.x;
            ball.vector.y = -ball.vector.y;
            ball.vector.angle > Math.PI ? ball.vector.angle = Math.PI - (ball.vector.angle - Math.PI) : ball.vector.angle = (2 * Math.PI - ball.vector.angle);
            ball.vector.force = useTheForce;
            this.forceControl(ball.vector);

        }
        if (this.hittingTop(ball)) {
            ball.vector.x = ball.vector.x;
            ball.vector.y = -ball.vector.y;
            ball.vector.angle > Math.PI ? ball.vector.angle = Math.PI - (ball.vector.angle - Math.PI) : ball.vector.angle = (2 * Math.PI - ball.vector.angle);
            ball.vector.force = useTheForce;
            this.forceControl(ball.vector);
        }
        this.angleControl(ball.vector);
    }

    computeColisions() {
        if (this.ballsMoving.collision.lenght === 0) return;
        this.ballsMoving.collision.forEach(el => {
            let temp = [];
            for (let i in el) {
                temp.push(el[i]);
            }
            temp.length === 1 ? this.computeBtTCollision(temp[0]) : this.computeBtBCollision(temp[0], temp[1]);
        });
        this.ballsMoving.collision.splice(0);
    }
    partBtB(ball1, ball2) {
            ball2.vector = new Vector(ball1.x, ball1.y, ball2.x, ball2.y);
            let a = ball2.vector;
            a.angle += a.angle - ball1.vector.angle;
            this.setVector(ball1.vector, a.angle, ball1.vector.force);
            ball1.vector.x = -ball1.vector.x;
            ball1.vector.y = -ball1.vector.y;
            ball1.vector.angle = this.computeAngle(ball1.vector);
            let coeficient = Math.abs(Math.sin(this.getAngle(ball1.vector, ball2.vector)));
            let help = ball1.vector.force;
            ball1.vector.force *= coeficient;
            ball2.vector.force = help * (1 - coeficient);
            this.forceControl(ball2.vector);
            this.forceControl(ball1.vector);
        }
        /**
         * 
         * @param {Ball} ball1 
         * @param {Ball} ball2 
         */
    computeBtBCollision(ball1, ball2) {
        let one = false;
        let two = false;
        let temp1 = JSON.parse(JSON.stringify(ball1));
        let temp2 = JSON.parse(JSON.stringify(ball2));
        let help1 = new Vector(ball1.x, ball1.y, ball2.x, ball2.y);
        let help2 = new Vector(ball2.x, ball2.y, ball1.x, ball1.y);
        if (Math.abs(ball1.vector.angle - help1.angle) > (Math.PI)) {
            ball1.vector.angle < help1.angle ? ball1.vector.angle += 2 * Math.PI : help1.angle += 2 * Math.PI;
        }
        if (Math.abs(ball2.vector.angle - help2.angle) > (Math.PI)) {
            ball2.vector.angle < help2.angle ? ball2.vector.angle += 2 * Math.PI : help2.angle += 2 * Math.PI;
        }
        if (ball1.vector.force > 0) {
            if (Math.abs(ball1.vector.angle - help1.angle) < (Math.PI / 2)) {
                this.partBtB(ball1, ball2);
            } else {
                ball2.vector.force = 0;
                this.forceControl(ball2.vector);
            }
            one = true;
        }
        if (temp2.vector.force > 0) {
            if (Math.abs(ball2.vector.angle - help2.angle) < (Math.PI / 2)) {
                this.partBtB(temp2, temp1);
            } else {
                temp1.vector.force = 0;
                this.forceControl(temp1.vector);
            }
            if (!one) {
                ball1 = temp1;
                ball2 = temp2;
            }
            two = true;
        }
        if (one && two) {
            this.vectorAddition(ball1.vector, temp1.vector);
            this.forceControl(ball1.vector);
            this.vectorAddition(ball2.vector, temp2.vector);
            this.forceControl(ball2.vector);
        }
        this.angleControl(ball1.vector);
        this.angleControl(ball2.vector);
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
        this.table.height = data.height * (127 / 150);
        this.table.width = data.height * (254 / 150);

        const offsetWidth = (data.windowWidth - this.table.width) / 2;
        this.table.x = offsetWidth;
        const offsetHeight = (data.height - this.table.height) / 2;
        this.table.y = offsetHeight + data.height / 30;
        moveX = data.windowWidth / 2;


        this.pockets.forEach(el => {
            el.radius = el.radius * (this.table.width / 254);
        });
        this.balls.forEach((el, index) => {
            if (index === 0) {
                el.radius = data.radiusWhite;
            } else {
                el.radius = data.radius;
            }
        });

        FileManager.updateGames(id, 'game', JSON.parse(JSON.stringify(this)));
    }

    computeInitialPositions(id) {
        const strictPosArray = [];
        const randomizePosArray = [];
        this.pockets[0].x = this.table.x - this.pockets[0].radius;
        this.pockets[0].y = this.table.y - this.pockets[0].radius;
        this.pockets[1].x = this.table.x + (this.table.width / 2);
        this.pockets[1].y = this.table.y - 2 * this.pockets[1].radius;
        this.pockets[2].x = this.table.x + this.table.width + this.pockets[2].radius;
        this.pockets[2].y = this.table.y - this.pockets[2].radius;
        this.pockets[3].x = this.table.x - this.pockets[3].radius;
        this.pockets[3].y = this.table.y + this.table.height + this.pockets[3].radius;
        this.pockets[4].x = this.table.x + (this.table.width / 2);
        this.pockets[4].y = this.table.y + this.table.height + 2 * this.pockets[4].radius;
        this.pockets[5].x = this.table.x + this.table.width + this.pockets[5].radius;
        this.pockets[5].y = this.table.y + this.table.height + this.pockets[5].radius;

        this.balls[0].x = (this.table.width / 4) + this.table.x;
        this.balls[0].y = (this.table.height / 2) + this.table.y;

        const somethingLikeTheRadiusButNotQuite = this.balls[0].radius * 0.82;

        const centerBall = {
            x: (((this.table.width) / 4) * 3) + this.table.x,
            y: (this.table.height / 2) + this.table.y
        };
        randomizePosArray.push({
            x: centerBall.x - (2 * somethingLikeTheRadiusButNotQuite),
            y: centerBall.y
        });
        strictPosArray.push(centerBall, {
            x: centerBall.x + (2 * somethingLikeTheRadiusButNotQuite),
            y: centerBall.y + (4 * this.balls[1].radius) / 2
        }, {
            x: centerBall.x + (2 * somethingLikeTheRadiusButNotQuite),
            y: centerBall.y - (4 * this.balls[1].radius) / 2
        });
        randomizePosArray.push({
            x: centerBall.x - (somethingLikeTheRadiusButNotQuite),
            y: centerBall.y + (this.balls[1].radius) / 2,
        }, {
            x: centerBall.x,
            y: centerBall.y + (2 * this.balls[1].radius) / 2
        }, {
            x: centerBall.x + (somethingLikeTheRadiusButNotQuite),
            y: centerBall.y + (this.balls[1].radius) / 2,
        }, {
            x: centerBall.x + (somethingLikeTheRadiusButNotQuite),
            y: centerBall.y + (3 * this.balls[1].radius) / 2,
        }, {
            x: centerBall.x + (2 * somethingLikeTheRadiusButNotQuite),
            y: centerBall.y
        }, {
            x: centerBall.x + (2 * somethingLikeTheRadiusButNotQuite),
            y: centerBall.y + (2 * this.balls[1].radius) / 2,
        }, { //opposite vv
            x: centerBall.x - (somethingLikeTheRadiusButNotQuite),
            y: centerBall.y - (this.balls[1].radius) / 2,
        }, {
            x: centerBall.x,
            y: centerBall.y - (2 * this.balls[1].radius) / 2
        }, {
            x: centerBall.x + (somethingLikeTheRadiusButNotQuite),
            y: centerBall.y - (this.balls[1].radius) / 2,
        }, {
            x: centerBall.x + (somethingLikeTheRadiusButNotQuite),
            y: centerBall.y - (3 * this.balls[1].radius) / 2,
        }, {
            x: centerBall.x + (2 * somethingLikeTheRadiusButNotQuite),
            y: centerBall.y - (2 * this.balls[1].radius) / 2,
        }, {
            x: centerBall.x + (2 * somethingLikeTheRadiusButNotQuite),
            y: centerBall.y - (2 * this.balls[1].radius) / 2,
        });

        //Adjust fixed positions
        this.balls[8].x = strictPosArray[0].x;
        this.balls[8].y = strictPosArray[0].y;

        const ballsToGoThrough = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15];
        if ((Math.random() * 10) % 2 === 0) {
            let nominee = Math.floor(Math.random() * 7);
            this.balls[ballsToGoThrough[nominee]].x = strictPosArray[1].x;
            this.balls[ballsToGoThrough[nominee]].y = strictPosArray[1].y;
            ballsToGoThrough.splice(nominee, 1);
            nominee = Math.floor(Math.random() * (ballsToGoThrough.length - 6) + 6);
            this.balls[ballsToGoThrough[nominee]].x = strictPosArray[2].x;
            this.balls[ballsToGoThrough[nominee]].y = strictPosArray[2].y;
            ballsToGoThrough.splice(nominee, 1);
        } else {
            let nominee = Math.floor(Math.random() * (ballsToGoThrough.length - 7) + 7);
            this.balls[ballsToGoThrough[nominee]].x = strictPosArray[1].x;
            this.balls[ballsToGoThrough[nominee]].y = strictPosArray[1].y;
            ballsToGoThrough.splice(nominee, 1);
            nominee = Math.floor(Math.random() * 7);
            this.balls[ballsToGoThrough[nominee]].x = strictPosArray[2].x;
            this.balls[ballsToGoThrough[nominee]].y = strictPosArray[2].y;
            ballsToGoThrough.splice(nominee, 1);
        }
        let lenghtOfArray = ballsToGoThrough.length;
        for (let i = 0; i < lenghtOfArray; i++) {
            let nominee = Math.floor(Math.random() * (ballsToGoThrough.length - 1));
            this.balls[ballsToGoThrough[nominee]].x = randomizePosArray[i].x;
            this.balls[ballsToGoThrough[nominee]].y = randomizePosArray[i].y;
            ballsToGoThrough.splice(nominee, 1);
        }
        FileManager.updateGames(id, 'balls', this.balls);
        let response = {};
        this.balls.forEach((el, index) => {
            response[index] = {
                x: el.x - moveX - el.radius / 2,
                y: -el.y,
            }
        });
        return response;
    }
    areBallsStill() {
        this.ballsMoving.moving.splice(0);
        let areStill = true;
        balls.forEach((el, index) => {
            if (el.vector.force > 0) {
                this.ballsMoving.moving.push(index);
                areStill = false;
            }
            this.forceControl(el.vector);

        });
        return areStill;
    }
    opositPocket(index) {
        switch (index) {
            case 0:
                return 5;
            case 1:
                return 4;
            case 2:
                return 3;
            case 3:
                return 2;
            case 4:
                return 1;
            case 5:
                return 0;
        }
    }
    blackHandler() {
        if (this.balls[8].hidden) {
            if (this.canPlayBlack[this.player - 1] && this.opositPocket(this.lastHole[this.player - 1]) === this.blackHole) {
                winner[this.player - 1] = true;
            } else {
                winner[this.player - 1] = true;
            }
        }
    }

    whiteHandler() {
        if (this.balls[0].hidden) {
            this.foul = true;
            this.balls[0].x = (this.table.width / 4) + this.table.x;
            this.balls[0].y = (this.table.height / 2) + this.table.y;
            this.balls[0].hidden = false;
        }
    }
    moveCalculater() {
        if (this.foul) {
            this.player = this.player === 1 ? 2 : 1;
            this.moves = 2;
        } else {
            this.moves--;
            if (this.moves < 1) {
                this.player = this.player === 1 ? 2 : 1;
            }
        }
    }
    foulHandler(firstColision) {
        if (this.ballsMoving.moving.length > 1) {
            if (firstColision) {
                firstColision = false;
                if (!this.playingFull[0] && !this.playingFull[1]) {

                } else {
                    if (this.canPlayBlack[this.player - 1]) {
                        if (this.playingFull[this.player - 1]) {
                            if (this.ballsMoving.moving[1] > 8) {
                                this.foul = true;
                            }
                        } else {
                            if (this.ballsMoving.moving[1] < 8) {
                                this.foul = true;
                            }
                        }
                    } else {
                        if (this.playingFull[this.player - 1]) {
                            if (this.ballsMoving.moving[1] > 7) {
                                this.foul = true;
                            }
                        } else {
                            if (this.ballsMoving.moving[1] < 9) {
                                this.foul = true;
                            }
                        }
                    }
                }
            } else {
                if (this.foul === undefined) {
                    this.foul = false;
                }
            }
        }
    }
    canPlayBlackHandler() {
        if (this.ballsRemaining[0] === 0) {
            this.canPlayBlack[0] = true;
        }
        if (this.ballsRemaining[1] === 0) {
            this.canPlayBlack[1] = true;
        }
    }
    forceControl(vector) {
        isNaN(vector.force) ? vector.force = 0 : vector.force = vector.force;
        vector.force <= parameters.ballsMinSpeed ? this.setForce(vector, 0) : vector.force = vector.force;
        vector.force > parameters.ballsMaxSpeed ? this.setForce(vector, parameters.ballsMaxSpeed) : this.setForce(vector, vector.force);
    }
    angleControl(vector) {
        vector.angle < 0 ? vector.angle += 2 * Math.PI : vector.force = vector.force;
        vector.angle >= 2 * Math.PI ? vector.angle -= 2 * Math.PI : vector.angle = vector.angle;
    }
    positionCorrection(ball1, ball2) {
        if (!(ball1.hidden || ball2.hidden)) {
            if (Math.pow(ball2.x - ball1.x, 2) + Math.pow(ball2.y - ball1.y, 2) <= (Math.pow(((ball1.radius + ball2.radius) / 2), 2))) {
                let help2 = new Vector(ball1.x, ball1.y, ball2.x, ball2.y);
                let help1 = new Vector(ball2.x, ball2.y, ball1.x, ball1.y);
                let distance = ((ball1.radius + ball2.radius) / 2) - this.getSize(help1);
                help1.force = distance / 2;
                help2.force = distance / 2;
                this.forceControl(help2);
                this.forceControl(help1);
                if (ball2.vector.force !== 0) {

                }
                ball2.x += help2.x;
                ball2.y += help2.y;
                ball1.x += help1.x;
                ball1.y += help1.y;
            }
        }
    }

    gameWizard(id, vector) {
        const response = {
            balls: [

            ]
        };
        let firstColision = true;
        this.foul = undefined;
        this.balls[0].vector = vector;
        this.forceControl(this.balls[0].vector);
        let timestamp = 0;
        while (!this.areBallsStill()) {
            timestamp++;
            this.foulHandler(firstColision);
            for (let i = 0; i < 16; i++) {
                let temp = JSON.parse(JSON.stringify(this.balls[i]));
                temp.x += (temp.vector.x / parameters.timestampCoeficant);
                temp.y += (temp.vector.y / parameters.timestampCoeficant);
                if (timestamp % parameters.timestampCoeficant === 0) {
                    temp.vector.force *= parameters.tableConstantDeceleration;
                    this.forceControl(temp.vector);
                }
                this.computeBtTCollision(temp);

                this.balls.forEach((el) => {
                    if (el.id !== temp.id) {
                        if (this.checkCollisionBtB(temp, el)) {
                            this.computeBtBCollision(temp, el);
                        }
                    }
                });
                this.checkAndComputeCollisionBtPs(temp);
                this.balls[i] = temp;
            }
            let temp = [];
            this.balls.forEach(el => {
                temp.push({
                    [el.id]: {
                        x: (el.x - moveX - el.radius / 2),
                        y: -el.y,
                        doHide: el.hidden,
                        angle: el.vector.angle
                    }
                });
            });
            response.balls.push({
                [timestamp]: temp
            });

        }
        if (this.foul === undefined) {
            this.foul = true;
        }
        this.canPlayBlackHandler();
        this.blackHandler();
        this.whiteHandler();
        this.moveCalculater();

        response.player = this.player;
        response.win = this.winner;
        console.log(timestamp);
        FileManager.updateGames(id, 'game', JSON.parse(JSON.stringify(this)));
        console.log("finished");
        return response;
    }
}