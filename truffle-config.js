const dotenv = require('dotenv');
const HDWalletProvider = require("truffle-hdwallet-provider");

dotenv.config();

const privateSeeds = process.env.WALLET_SEEDS;
const endpointUrl = process.env.INFURA_KOVAN_ENDPOINT;

module.exports = {
    compilers: {
        solc: {
            version: "^0.7.6",
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*",
        },
        kovan: {
            provider: function() {
                return new HDWalletProvider(
                    privateSeeds,
                    endpointUrl
                )
            },
            gas: 5000000,
            gasPrice: 25000000000,
            network_id: 42
        }
    }
}