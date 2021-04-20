const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const contractFile = 'APR.sol';
const contractPath = path.resolve(__dirname, 'contracts', 'APR', contractFile);
const source = fs.readFileSync(contractPath, 'utf8');

var input = {
    language: 'Solidity',
    sources: {
        [contractFile] : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
               '*': ['*']
            }
        }
    }
};
  
var output = JSON.parse(solc.compile(JSON.stringify(input)));

// const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

// for (let contract in output) {
//     fs.outputJSONSync(
//         path.resolve(buildPath, contract + '.json'),
//         output[contract]
//     );
// }

if(output.errors) {
    output.errors.forEach(err => {
        console.log(err.formattedMessage);
    });
} 
else {
    const contracts = output.contracts[contractFile];
    for (let contractName in contracts) {
        const contract = contracts[contractName];
        fs.writeFileSync(path.resolve(buildPath, `${contractName}.json`), JSON.stringify(contract.abi, null, 2), 'utf8');
    }
}