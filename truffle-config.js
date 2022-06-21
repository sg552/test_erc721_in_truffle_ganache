require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { INFURA_API_URL, MNEMONIC } = process.env;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    ganache: {
      provider: () => new HDWalletProvider("gym host tag slow tent leopard woman emerge pear again bar fish", "http://192.168.10.54:3355"),
      network_id: "5777",
      networkCheckTimeout: 30000,
      timeoutBlocks: 200,
      addressIndex: 2
    },
    goerli: {
      provider: () => new HDWalletProvider(MNEMONIC, INFURA_API_URL),
      network_id: '5',
      gas: 5500000,
      networkCheckTimeout: 1000000,
      timeoutBlocks: 200,
      addressIndex: 2
    }
  },
  compilers: {
    solc: {
      // version: "^0.8.0",
      version: "0.8.15",
    }
  },
  plugins: ['truffle-plugin-verify'],
  api_keys: {
    etherscan: '4ANBPF8KQQHJ6J9BBU7WU53BNPDMXHYJMW'
  }
};
