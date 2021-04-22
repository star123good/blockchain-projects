const dotenv = require('dotenv');
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledContract = require('./build/APRSale.json');


dotenv.config();


console.log("kovan:", process.env.INFURA_KOVAN_ENDPOINT);

const provider = new HDWalletProvider(
    process.env.WALLET_SEEDS, // secret words
    process.env.INFURA_KOVAN_ENDPOINT // infura url
);
// console.log("provider:", provider);

const web3 = new Web3(provider);
// console.log("web3:", web3);


const deploy = async (web3) => {
    try {
        console.log("deploy...");

        const accounts = await web3.eth.getAccounts();

        console.log('Attempting to deploy from account', accounts[0]);
    
        // const result = await new web3.eth.Contract(
        //     compiledContract.abi
        // ).deploy({
        //     data: compiledContract.evm.bytecode.object
        // }).send({
        //     from: accounts[0],
        //     gas: '3000000'
        // });
    
        // console.log('Contract deployed to', result.options.address);
    }
    catch(e) {
        console.log(e);
    }
};

deploy(web3);

