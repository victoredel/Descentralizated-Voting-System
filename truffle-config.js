const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {
  networks: {
    mumbai: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,       // Mumbai's id
      confirmations: 2,        // Number of confirmations to wait between deployments
      timeoutBlocks: 200,      // Number of blocks before a deployment times out
      skipDryRun: true         // Skip dry run before migrations
    },
  },
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.0"
    }
  }
};
