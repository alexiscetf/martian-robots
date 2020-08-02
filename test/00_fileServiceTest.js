'use stricts'

const expect = require('chai').expect;
const Robot = require('../model/robot.js');
const fileServices = require('../services/fileServices');


describe('### fileServices: ', () => {

    it('# loadInputData ', async () => {

        const inputData = fileServices.loadInputData('/test/filesTest/sample001.txt')

        expect(inputData != undefined).to.equal(true)
        expect(inputData.coordinateXGrid).to.equal(5)
        expect(inputData.coordinateYGrid).to.equal(3)
        expect(inputData.robotsList.length).to.equal(3)
    });

    it('# writeOutputData ', async () => {

        let robot1 = new Robot(1, 1, 'E', 'RFRFRFRF')
        let robot2 = new Robot(3, 2, 'N', 'FRRFLLFFRRFLL')
        let robot3 = new Robot(0, 3, 'W', 'LLFFFLFLFL')

        let robots = [robot1, robot2, robot3]

        fileServices.writeOutputData(robots, '/test/filesTest/output001.txt')
    });

})