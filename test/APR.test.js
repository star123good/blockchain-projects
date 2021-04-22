const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');


const web3 = new Web3(ganache.provider());


const compiledContractAPR = require('../build/APR.json');
const compiledContractSale = require('../build/APRSale.json');


let accounts;
let contractAPR;
let contractSale;


beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    // console.log("accounts:", accounts);

    // await web3.eth.getBalance(accounts[0]).then(console.log);
    
    contractAPR = await new web3.eth.Contract(
        compiledContractAPR.abi
    ).deploy({
        data: compiledContractAPR.evm.bytecode.object
    }).send({
        from: accounts[0],
        gas: '3000000'
    });

    contractSale = await new web3.eth.Contract(
        compiledContractSale.abi
    ).deploy({
        data: compiledContractSale.evm.bytecode.object,
        arguments: [contractAPR.options.address]
    }).send({
        from: accounts[0],
        gas: '3000000'
    });
});


describe('APR', () => {
    it('deploys a contract of APR', () => {
        console.log("APR contract address", contractAPR.options.address);
        assert.ok(contractAPR.options.address);
    });

    it('calls the contract name, symbol, decimals', async () => {
        const name = await contractAPR.methods.name().call();
        const symbol = await contractAPR.methods.symbol().call();
        const decimals = await contractAPR.methods.decimals().call();
        assert.strictEqual("April", name);
        assert.strictEqual("APR", symbol);
        assert.strictEqual("6", decimals);
    });

    it('calls the contract totalSupply', async () => {
        const totalSupply = await contractAPR.methods.totalSupply().call();
        console.log("totalSupply", totalSupply);
        assert.strictEqual("21000000", totalSupply);
    });

    it('calls the contract owner', async () => {
        const owner = await contractAPR.methods.owner().call();
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

describe('APR Sale', () => {
    it('deploys a contract of APRSale', () => {
        console.log("APRSale contract address", contractSale.options.address);
        assert.ok(contractSale.options.address);
    });

    it('calls the contract price', async () => {
        let price = await contractSale.methods.price().call();
        assert.strictEqual("1", price);

        await contractSale.methods.setPrice(1000).send({
            from: accounts[0],
            gas: '1000000'
        });

        price = await contractSale.methods.price().call();
        assert.strictEqual("1000", price);
    });
});
