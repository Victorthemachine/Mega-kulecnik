module.exports = class Vector {

    /**
     * Creates a vector with specified parameters
     * 
     * @param {Number} x_1 
     * @param {Number} y_1 
     * @param {Number} [x_2] 
     * @param {Number} [y_2] 
     * @param {JSON} [options] options: force: Number, angle: Number, owner: Ball/CueStick 
     */
    constructor(x_1, y_1, x_2, y_2, options = {}) {
        if (options.owner !== undefined) {
            this.x = this.computeX(options.owner.x, x_1);
            this.y = this.computeY(options.owner.y, y_1);
        } else {
            if (x_2 && y_2 === undefined) {
                this.x = x_1;
                this.y = y_1;
            } else {
                this.x = this.computeX(x_1, x_2);
                this.y = this.computeY(y_1, y_2);
            }
        }
        this.force = options.force || this.getSize();
        this.angle = options.angle || this.computeAngle();
        this.owner = options.owner;
    }

    /**
     * Private function
     * 
     * @param {Number} x_1 
     * @param {Number} x_2
     * 
     * @returns {Number} x; 
     */
    computeX(x_1, x_2) {
        return x_2 - x_1;
    }

    /**
     * Private function
     * 
     * @param {Number} y_1 
     * @param {Number} y_2 
     * 
     * @returns {Number} y
     */
    computeY(y_1, y_2) {
        return y_2 - y_1;
    }

    /**
     * Private function
     * 
     * @returns {Number} degrees
     */
    computeAngle() {
        return Math.acos((this.x * 1 + this.y * 0) / (this.getSize() * Math.sqrt(Math.pow(1, 2) + Math.pow(0, 2))));
    }

    /**
     * Sets the force and adjusts other parameters accordingly
     * 
     * @param {Number} force
     */
    setForce(force) {
            if (force < 0) throw new Error('FORCE CANNOT BE NEGATIVE');
            this.force = force;
            let adjustParams = this.convertForce();
            this.x = adjustParams.x;
            this.y = adjustParams.y;
        }
        /**
         * 
         * @param {Number} angle 
         * @param {Number} force 
         */
    setVector(angle, force) {
            this.angle = angle;
            this.setForce(force);
        }
        /**
         * Private function
         * 
         * Convert force to X and Y cordinates
         * 
         * @returns {JSON} X,Y returns { x: something, y: something }
         */
    convertForce() {
        let answer = {};
        answer.x = this.force * Math.cos(this.angle);
        answer.y = this.force * Math.sin(this.angle);
        return answer;
    }

    /**
     * Computes the size of the vector
     * 
     * @returns {Number} size
     */
    getSize() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    /**
     * Gets angle between the two vectors
     * 
     * @param {Vector} vector
     * 
     * @returns {Number} degrees
     */
    getAngle(vector) {
        return Math.acos((this.x * vector.x + this.y * vector.y) / (this.getSize() * vector.getSize()));
    }

    /**
     * 
     * @param {Vector} vector 
     */
    vectorAddition(vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.angle = this.computeAngle();
        this.force = this.getSize();
    }

    //TODO setAngle() with update to cordinates
}