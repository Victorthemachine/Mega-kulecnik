const Ball = require('./objects/Ball.js');
const Table = require('./objects/Table.js');

const table = new Table();
const balls = [];

//TODO Add check for holes!
/**
 * Game manager... controls all elements for a game
 * 
 */
module.exports = class Game {

    constructor() {
        this.table = table;
        this.initBalls();
        this.balls = balls;
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
                pointOnTable.second = { x: table.width, y: ball.y };
                break;
            case 'LEFT TOP':
                pointOnTable.first = { x: ball.x, y: table.height };
                pointOnTable.second = { x: table.x, y: ball.y };
                break;
            case 'RIGHT TOP':
                pointOnTable.first = { x: ball.x, y: table.height };
                pointOnTable.second = { x: table.width, y: ball.y };
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
     * For now just a dummy method later make sure to adjust x,y
     */
    initBalls() {
        for (let i = 0; i < 16; i++) {
            balls.push(new Ball(i, this, {
                x: i,
                y: i,
                hidden: false
            }))
        }
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
        console.log(`Hidden? ${ball_1.hidden || ball_2.hidden === true}`);
        if (ball_1.hidden || ball_2.hidden === true) return false;
        if (Math.sqrt(Math.pow(ball_2.x - ball_1.x, 2) + Math.pow(ball_2.y - ball_1.y, 2)) <= (ball_1.radius + ball_2.radius)) {
            return true;
        }
        return false;
    }
}