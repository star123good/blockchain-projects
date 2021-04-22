const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');


const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);


const getSource = (contractFile, contractPath) => ({
    [contractFile] : {
        content: fs.readFileSync(path.resolve(__dirname, 'contracts', contractPath, contractFile), 'utf8')
    }
});

const getSources = (contractFiles=[], contractPath='APR') => {
    let sources = {};
    contractFiles.forEach(c => {
        sources = { ...sources, ...getSource(c, contractPath) };
    });
    return sources;
};

var input = {
    language: 'Solidity',
    sources: getSources([
        'APR.sol', 'ERC20.sol', 'Context.sol', 'IERC20.sol', 'SafeMath.sol', 'Ownable.sol', 'APRSale.sol'
    ]),
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