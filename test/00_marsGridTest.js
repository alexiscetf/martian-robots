'use stricts'

const expect = require('chai').expect;

const InputData = require('../model/inputData.js');
const MarsGrid = require('../model/marsGrid.js');
const Robot = require('../model/robot.js');
const fileServices = require('../services/fileServices');


describe('### MARS GRID: ', () => {

    it('# RUN SEQUENCES ', async () => {


        //create an input model
        let inputData = new InputData()
        inputData.coordinateXGrid = 5
        inputData.coordinateYGrid = 3

        //create robots
        let robot1 = new Robot(1, 1, 'E', 'RFRFRFRF')
        let robot2 = new Robot(3, 2, 'N', 'FRRFLLFFRRFLL')
        let robot3 = new Robot(0, 3, 'W', 'LLFFFLFLFL')

        //add robots
        inputData.robotsList.push(robot1)
        inputData.robotsList.push(robot2)
        inputData.robotsList.push(robot3)

        //initialize the Grid with the InputData
        let marsGrid = new MarsGrid(inputData.coordinateXGrid, inputData.coordinateYGrid);
        marsGrid.robotsList = inputData.robotsList

        // the lower-left coordinates are assumed to be 0, 0.
        expect(marsGrid.grid.length).to.equal(inputData.coordinateXGrid + 1)
        expect(marsGrid.grid[0].length).to.equal(inputData.coordinateYGrid + 1)
        expect(marsGrid.robotsList.length).to.equal(3);

        //Launch run sequences of robots
        const robotsResult = marsGrid.runSequences()


        // verify the result
        expect(robotsResult.length).to.equal(3)
        expect(robotsResult[0].coordinateX).to.equal(1);
        expect(robotsResult[0].coordinateY).to.equal(1);
        expect(robotsResult[0].orientation).to.equal('E');
        //robot2 is lost
        expect(robotsResult[1].isLost).to.equal(true);

    });

})

