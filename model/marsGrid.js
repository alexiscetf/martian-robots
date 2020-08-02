'use strict'

const config = require('../config')

/**
 * Class of the Grid Mars
 */
class MarsGrid {

    /**
     * Constructor MarsGrid
     * @param {Integer} lengthX 
     * @param {Integer} lengthY 
     */
    constructor(lengthX, lengthY) {

        //initialize class attributes
        if (lengthX > config.MAX_COORDINATE || lengthY > config.MAX_COORDINATE) {
            throw (`MarsGrid - The maximum value for any coordinate is ${config.MAX_COORDINATE}`)
        }

        // the lower-left coordinates are assumed to be 0, 0.
        this.grid = new Array(lengthX + 1)
        for (let i = 0; i < lengthX + 1; i++) {
            this.grid[i] = new Array(lengthY + 1);
        }

        //list of robots in the grid
        this.robotsList = []
    }

    //*********************************************** */
    //functions
    //*********************************************** */

    /**
     * Add robot to the grid 
     * @param {Robot} robot    
     */
    addRobot(robot) {

        if (robot.coordinateX > this.grid.length) {
            throw (`The coordiante X (${robot.coordinateX}) of the robot is not valid for the grid (max ${this.grid.length - 1})`)
        }

        if (robot.coordinateY > this.grid[robot.coordinateX].length) {
            throw (`The coordiante Y (${robot.coordinateY}) of the robot is not valid for the grid (max ${this.grid[robot.coordinateX].length - 1})`)
        }

        //add robot to the grid
        this.robotsList.push(robot)

    }

    /**
     * Run the robot sequences
     * @returns {Object} result of running the robot sequences
     */
    runSequences() {
        this.robotsList.forEach(robot => {

            // iterate through the sequence
            for (const c of robot.sequence) {

                //if the robot is not lost we execute the sequence
                if (!robot.isLost) {

                    switch (c) {
                        case 'R':   //turn right
                            robot.turn(c)
                            break;
                        case 'L':   //turn left
                            robot.turn(c)
                            break;
                        case 'F':   //forward

                            //actual coordinates
                            const xAct = robot.coordinateX
                            const yAct = robot.coordinateY

                            // check whether a robot has been lost in this displacement previously
                            if ((this.grid[xAct][yAct] == undefined) || (!this.grid[xAct][yAct].includes(robot.orientation))) {

                                // forward the robot
                                robot.forward()

                                //check if the robot is lost                                 
                                if ((robot.coordinateX < 0 || robot.coordinateX >= this.grid.length)
                                    || (robot.coordinateY < 0 || robot.coordinateY >= this.grid[0].length)) {

                                    //mark the position and orientation where the robot was lost
                                    this.grid[xAct][yAct] == undefined ? this.grid[xAct][yAct] = [robot.orientation] : this.grid[xAct][yAct].push(robot.orientation);

                                    // mark the robot as lost at the current coordinates
                                    robot.markLost(xAct, yAct);

                                }
                            }
                            break
                        default:
                            throw (`Invalid sequence value error (${c}) in the robot`)
                    }
                }
            }
        })

        //result of running the robot sequences
        return this.robotsList
    }
}


module.exports = MarsGrid