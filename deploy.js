const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledContract = require('./build/APR.json');


const deploy = async (web3) => {
    try {

        const accounts = await web3.eth.getAccounts();

        console.log('Attempting to deploy from account', accounts[0]);
    
        const result = await new web3.eth.Contract(
            compiledContract.abi
        ).deploy({
            data: compiledContract.evm.bytecode.object
        }).send({
            from: accounts[0],
            gas: '3000000'
        });
    
        console.log('Contract deployed to', result.options.address);

    }
    catch(e) {
        console.log(e);
    }
};

try {
    const provider = new HDWalletProvider(
        'slender raise asthma predict bone chuckle bridge adult shoe pencil connect remain', // secret words
        'https://rinkeby.infura.io/830ccf78e32a4a639bf8afe2f7a262a6' // infura url
    );
    const web3 = new Web3(provider);
    
    deploy(web3);
}
catch(e) {
    console.log(e);
}