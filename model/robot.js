'use strict'

const config = require('../config')

/**
 * Class Robot
 */
class Robot {

    /**     
     * @param {Integer} coordinateX - coordinate X
     * @param {Integer} coordinateY - coordinate Y
     * @param {Char} orientation - [N, S, E, W]
     * @param {String} sequence
     */
    constructor(coordinateX, coordinateY, orientation, sequence) {

        //initialize class attributes
        if (coordinateX > config.MAX_COORDINATE || coordinateY > config.MAX_COORDINATE) {
            throw (`Robot - The maximum value for any coordinate is ${config.MAX_COORDINATE}`)
        }

        if (sequence.length > config.MAX_SEQUENCE) {
            throw (`Robot - The maximum value for any sequence is ${config.MAX_SEQUENCE}`)
        }

        this.coordinateX = coordinateX
        this.coordinateY = coordinateY
        this.orientation = orientation
        this.sequence = sequence
        this.isLost = false
    }

    //*********************************************** */
    //functions
    //*********************************************** */


    /**
     * rotate the robot orientation
     * @param {Char} direction - direction to turn
     */
    turn(direction) {
        switch (this.orientation) {
            case 'N':
                (direction == 'L') ? this.orientation = 'W' : this.orientation = 'E'
                break;
            case 'S':
                (direction == 'L') ? this.orientation = 'E' : this.orientation = 'W'
                break;
            case 'E':
                (direction == 'L') ? this.orientation = 'N' : this.orientation = 'S'
                break;
            case 'W':
                (direction == 'L') ? this.orientation = 'S' : this.orientation = 'N'
                break;
            default:
                throw (`Invalid sequence value error (${direction}) in the robot`)
        }
    }

    /**
     * the robot moves forward one grid point in the direction of the current orientation and maintains the same orientation
     */
    forward() {
        switch (this.orientation) {
            case 'N':
                this.coordinateY += 1
                break;
            case 'S':
                this.coordinateY -= 1
                break;
            case 'E':
                this.coordinateX += 1
                break;
            case 'W':
                this.coordinateX -= 1
                break;
        }
    }

    /**
     * mark the robor as lost
     */
    markLost(xAct, yAct) {
        this.isLost = true
        this.coordinateX = xAct
        this.coordinateY = yAct
    }

}

module.exports = Robot