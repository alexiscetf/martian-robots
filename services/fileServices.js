'use strict'


const fs = require('fs')
const InputData = require('../model/inputData.js');
const Robot = require('../model/robot.js');

/**
 * API Service
 */
module.exports = {
    loadInputData,
    writeOutputData
};


/**
 * read input file
 * @param {String} pathFile - path the file to load
 * @return InputData
 */
function loadInputData(pathFile) {

    try {

        //read input file
        const data = fs.readFileSync(process.cwd() + pathFile, 'utf8')
        console.log('### Input Data')
        console.log(data)

        //split input data '\n' 
        const inputArray = data.split('\n')

        //InputData Result
        let inputData = new InputData()

        //size Grid    
        const [sizeX, sizeY] = inputArray[0].split(/\s+/)

        inputData.coordinateXGrid = Number(sizeX)
        inputData.coordinateYGrid = Number(sizeY)

        //create Robots
        let index = 1
        while (index < inputArray.length) {
            // get coordinates and orientation
            const [coordinateX, coordinateY, orientation] = inputArray[index].split(/\s+/)
            //get sequente
            const sequence = inputArray[index + 1]

            let robot = new Robot(Number(coordinateX), Number(coordinateY), orientation, sequence)

            //add Robot 
            inputData.robotsList.push(robot)

            // 2 lines for input robot 
            index += 2
        }

        return inputData

    } catch (error) {
        if (error.code === 'ENOENT') {
            throw (`File not found: ${pathFile}`);
        } else {
            throw ('Error processing input file', error)
        }
    }
}


/**
 * read input file
 * @param {Robots[]} robots - array with robots result
 * @param {String} pathFile - path file output

 * @return InputData
 */
function writeOutputData(robots, pathFile) {

    try {

        const writeStream = fs.createWriteStream(process.cwd() + pathFile, 'utf8');

        const pathName = writeStream.path;

        // write each value of the array of robots
        robots.forEach(robot => {
            if (robot.isLost) {
                writeStream.write(`${robot.coordinateX} ${robot.coordinateY} ${robot.orientation} LOST\n`)
            } else {
                writeStream.write(`${robot.coordinateX} ${robot.coordinateY} ${robot.orientation}\n`)
            }
        })


        // the finish event is emitted when all data has been flushed from the stream
        writeStream.on('finish', () => {
            console.log(`\nOutput File: ${pathName}`);
        });

        // handle the errors on the write process
        writeStream.on('error', (err) => {
            console.error(`\nThere is an error writing the file ${pathName} => ${err}`)
        });

        // close the stream
        writeStream.end();


    } catch (error) {
        throw ('Error processing output file', error)
    }

}