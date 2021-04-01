

module.exports = class Hole {

    /**
     * Corner holes: diameter - 11.25 cm
     * Center holes: diameter - 12.5 cm
     * 
     * @param {Number} id - from left bottom 
     * @param {*} options 
     */
    constructor(id, options = {}) {
        this.id = id;
        this.x = options.x;
        this.y = options.y;
        this.radius = options.radius;
    }

}