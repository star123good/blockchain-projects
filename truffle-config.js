const dotenv = require('dotenv');
const HDWalletProvider = require('truffle-hdwallet-provider-privkey');

dotenv.config();

const privateKey = process.env.INFURA_PROJECT_SECRET;
const endpointUrl = process.env.INFURA_KOVAN_ENDPOINT;

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "5777",
        },
        kovan: {
            provider: function() {
                return new HDWalletProvider(
                    //private keys array
                    [privateKey],
                    //url to ethereum node
                    endpointUrl
                )
            },
            gas: 5000000,
            gasPrice: 25000000000,
            network_id: 42
        }
    }
}