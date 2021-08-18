/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomiclabs/hardhat-ethers');

const dotenv = require('dotenv');
dotenv.config();
const PK1 = process.env.PRIVATE_KEY_1;

module.exports = {
   defaultNetwork: 'hardhat',

   networks: {
      hardhat: {},
      matic: {	
         url: "https://rpc-mainnet.maticvigil.com",
         network_id: 137,
         accounts: [PK1],
         chainId: 137
       },
       mumbai: {	
         url: "https://matic-mumbai.chainstacklabs.com",
         network_id: 80001,
         accounts: [PK1],
         chainId: 80001
       },
   },
   solidity: {
      compilers: [
         {
            version: '0.5.16',
            settings: {
               optimizer: {
                  enabled: true,
                  runs: 200,
               },
            },
         },
         {
            version: '0.6.6',
            settings: {
               optimizer: {
                  enabled: true,
                  runs: 200,
               },
            },
         },
      ],
   },
   paths: {
      sources: './contracts',
      cache: './cache',
      artifacts: './artifacts',
   },
   mocha: {
      timeout: 20000,
   },
};
