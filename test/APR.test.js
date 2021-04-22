const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const compiledContract = require('../build/APR.json');

let accounts;
let contract;


beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    // console.log("accounts:", accounts);

    // await web3.eth.getBalance(accounts[0]).then(console.log);
    
    contract = await new web3.eth.Contract(
        compiledContract.abi
    ).deploy({
        data: compiledContract.evm.bytecode.object
    }).send({
        from: accounts[0],
        gas: '3000000'
    });
});


describe('APR', () => {
    it('deploys a contract of APR', () => {
        assert.ok(contract.options.address);
    });

    it('calls the contract name, symbol, decimals', async () => {
        const name = await contract.methods.name().call();
        const symbol = await contract.methods.symbol().call();
        const decimals = await contract.methods.decimals().call();
        assert.strictEqual("April", name);
        assert.strictEqual("APR", symbol);
        assert.strictEqual("6", decimals);
    });

    it('calls the contract totalSupply', async () => {
        const totalSupply = await contract.methods.totalSupply().call();
        console.log("totalSupply", totalSupply);
        assert.strictEqual("21000000", totalSupply);
    });

    it('calls the contract owner', async () => {
        const owner = await contract.methods.owner().call();
        console.log("owner", owner);
        assert.strictEqual(accounts[0], owner);
    });

    // it('allows people to contribute money and marks them as approvers', async () => {
    //     await campaign.methods.contribute().send({
    //         value: '200',
    //         from: accounts[1]
    //     });
    //     const isContributor = await campaign.methods.approvers(accounts[1]).call();
    //     assert(isContributor);
    // });
});
