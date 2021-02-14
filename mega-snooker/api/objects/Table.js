const Ball = require('./Ball.js');

/**
 * Handles the Table of the pool.
 * Link for the resource (measurments): https://www.liveabout.com/4-x-9s-are-the-best-table-size-368804# (approx. 120x275cm)
 */
module.exports = class Table {

    /**
     * Creates a table for the game
     */
    constructor() {
        this.width = 254;
        this.height = 127;
        this.x = 0;
        this.y = 0;
    }

    /**
     * Returns the quadrant of the table the ball is in. (Doesn't account if the ball is within the bounds of the table)
     * 
     * @param {Ball} ball 
     */
    getBallPositionQuadrant(ball) {
        let answer = '';
        if (ball.x < this.width / 2) {
            answer += 'LEFT';
        } else {
            answer += 'RIGHT';
        }
        if (ball.y < this.height / 2) {
            answer += ' BOTTOM';
        } else {
            answer += ' TOP';
        }
        return answer;
    }
}