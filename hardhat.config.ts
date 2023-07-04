import { HardhatUserConfig } from "hardhat/config";
import "@typechain/hardhat"
import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-ethers"
import "hardhat-gas-reporter"
import "dotenv/config"
import "solidity-coverage"
import "hardhat-deploy"



const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COINMARKET_CAP_API_KEY = process.env.COINMARKET_CAP_API_KEY;
const POLYGON_RPC_URL = process.env.POLYGON_RPC_URL;
const POLYGON_API_KEY = process.env.POLYGON_API_KEY;

const config: HardhatUserConfig = {
  solidity: { compilers: [{ version: "0.8.9" },{version:"0.6.6"}] },
 
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      chainId: 5,
    },

    hardhat: {
      // // If you want to do some forking, uncomment this
      // forking: {
      //   url: MAINNET_RPC_URL
      // }
      chainId: 31337,
  },
  localhost: {
      chainId: 31337,
  },

    mumbai: {
      url: POLYGON_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      chainId: 80001,
    },
  },
  etherscan: {
    apiKey: POLYGON_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKET_CAP_API_KEY,
  },
  namedAccounts: {
    deployer: {
        default: 0,
    },
    
    user: {
        default: 1,
    },
},

  mocha: {
    timeout: 900000,
  },
};



// module.exports = {};

export default config;
