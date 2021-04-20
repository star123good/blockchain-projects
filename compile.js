const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');


const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);


var input = {
    language: 'Solidity',
    sources: {
        'APR.sol' : {
            content: fs.readFileSync(path.resolve(__dirname, 'contracts', 'APR', 'APR.sol'), 'utf8')
        },
        'ERC20.sol' : {
            content: fs.readFileSync(path.resolve(__dirname, 'contracts', 'APR', 'ERC20.sol'), 'utf8')
        },
        'Context.sol' : {
            content: fs.readFileSync(path.resolve(__dirname, 'contracts', 'APR', 'Context.sol'), 'utf8')
        },
        'IERC20.sol' : {
            content: fs.readFileSync(path.resolve(__dirname, 'contracts', 'APR', 'IERC20.sol'), 'utf8')
        },
        'SafeMath.sol' : {
            content: fs.readFileSync(path.resolve(__dirname, 'contracts', 'APR', 'SafeMath.sol'), 'utf8')
        },
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


fs.ensureDirSync(buildPath);


if(output.errors) {
    output.errors.forEach(err => {
        console.log(err.formattedMessage);
    });
} 
else {
    for (let contractFile in output.contracts) {
        const contracts = output.contracts[contractFile];
        for (let contractName in contracts) {
            const contract = contracts[contractName];
            fs.writeFileSync(path.resolve(buildPath, `${contractName}.json`), JSON.stringify(contract, null, 2), 'utf8');
            // fs.writeFileSync(path.resolve(buildPath, `${contractName}.json`), JSON.stringify(contract.abi, null, 2), 'utf8');
            // fs.writeFileSync(path.resolve(buildPath, `${contractName}.json`), contract.evm.bytecode.object, 'utf8');
        }
    }
}