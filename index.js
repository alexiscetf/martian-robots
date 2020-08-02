// 'use strict';

const MarsGrid = require('./model/marsGrid.js');
const fileServices = require('./services/fileServices');


// path defaults files
let pathInputFile = '/inputData/sample001.txt'
let pathOutputFile = '/outputData/result001.txt'


function main() {

    try {

        //check the input parameters
        checkInputParams()

        //read input file
        const inputData = fileServices.loadInputData(pathInputFile)

        //initialize the Grid with the InputData
        let marsGrid = new MarsGrid(inputData.coordinateXGrid, inputData.coordinateYGrid);
        marsGrid.robotsList = inputData.robotsList

        //Launch run sequences of robots
        const robotsResult = marsGrid.runSequences()


        console.log('\n### Result:')

        robotsResult.forEach(robot => {
            console.log(robot.coordinateX, robot.coordinateY, robot.orientation, robot.isLost ? 'LOST' : '')
        })

        //write output file
        fileServices.writeOutputData(robotsResult, pathOutputFile)
        
    } catch (error) {
        console.error(error)
        process.exit(1);
    }
}



/**
 * Check and set script input parameters
 */
function checkInputParams() {
    if (process.argv.length <= 2) {
        console.log(`Input File Defautl: ${pathInputFile} \n`);
    }
    else {
        if (process.argv.length == 6) {
            pathInputFile = process.argv[3];
            pathOutputFile = process.argv[5];
        }
        else {
            console.error('ERROR: The command was not invoked correctly ...');
            console.log('node index.js -i [PATH_INPUT_FILE] -o [PATH_OUTPUT_FILE]');
            console.log(`Sample: node index.js -i ${pathInputFile} -o ${pathOutputFile}`);
            process.exit(1);
        }
    }
}


//launch main function
main()