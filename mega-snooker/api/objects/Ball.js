const Vector = require('./Vector.js');
const radius = 28.6; //57.2mm, White = 60.3mm

//15 balls and one white
module.exports = class Ball {

    /**
     * Creates ball object with id 0-15 (16 balls) and game that owns it
     * 
     * @param {Number} id 
     * @param {JSON} [options] x: Number, y: Number, hidden: Boolean, vector: Vector
     */
    constructor(id, options = {}) {
        this.id = id;
        this.x = options.x;
        this.y = options.y;
        this.hidden = options.hidden || false;
        this.vector = options.vector;
        this.radius = id === 0 ? 30.15 : radius;
        this.color = this.fetchColor(id);
    }

    refactorCordinate() {
        const point = {
            x: this.x - this.radius,
            y: this.y - this.radius
        }
        return point;
    }

    fetchColor(id) {
        switch (id) {
            case 0:
                return "WHITE_FULL";
            case 1:
                return "YELLOW_FULL";
            case 2:
                return "BLUE_FULL";
            case 3:
                return "RED_FULL";
            case 4:
                return "PURPLE_FULL";
            case 5:
                return "ORANGE_FULL";
            case 6:
                return "GREEN_FULL";
            case 7:
                return "MAROON_FULL";
            case 8:
                return "BLACK_FULL";

            case 9:
                return "YELLOW_STRIPE";
            case 10:
                return "BLUE_STRIPE";
            case 11:
                return "RED_STRIPE";
            case 12:
                return "BLUE_STRIPE";
            case 13:
                return "ORANGE_STRIPE";
            case 14:
                return "GREEN_STRIPE";
            case 15:
                return "MAROON_STRIPE";
        }
    }

    /**
     * Checks for all collision, processes and returns a JSON with status.
     * 
     * @returns {JSON} { withBalls: { collision: true/false, affectedBalls: [ball_1, ball_2...] }, withTable: true/false }
     */
    collisionCheck() {
        let answer = { withBalls: { collision: false, affectedBalls: [] }, withTable: false };
        console.log(this.id);
        const tempArr = this.game.getBalls().filter(el => {
            console.log(`${el.id} ${el.id !== this.id}`);
            return el.id !== this.id;
        });
        console.log(tempArr);
        tempArr.forEach(el => {
            if (this.game.checkCollisionBtB(this, el)) {
                answer.withBalls.collision = true;
                answer.withBalls.affectedBalls.push(el);
            }
        });
        if (this.game.checkCollisionBtT(this)) answer.withTable = true;
        return answer;
    }

    /**
     * Moves the ball by the supplied vector.
     * 
     * @param {Vector} vector 
     */
    moveByVector(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }
}