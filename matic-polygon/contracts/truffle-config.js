const HDWalletProvider = require('@truffle/hdwallet-provider');
const dotenv = require('dotenv');
dotenv.config();

const PK = process.env.PRIVATE_KEY_1;

module.exports = {
  networks: {
    mumbai: {	
      provider: () => new HDWalletProvider([PK], `https://matic-mumbai.chainstacklabs.com`),
      network_id: 80001,
      chainId: 80001,
      gas: 0,
      gasPrice: 2100000000,
      skipDryRun: true,
      confirmations: 2,
      timeoutBlocks: 200
    },
  },
  compilers: {
    solc: {
    }
  },
  mocha: {
    // timeout: 100000
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
};
