import { HardhatUserConfig } from "hardhat/config";
import dotenv from "dotenv";
import "@nomicfoundation/hardhat-toolbox";

dotenv.config()

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  paths: {
    sources: './contracts',
  },
  networks: {
    hardhat: {},
    mumbai: {
      chainId: 80001,
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    amoy: {
      chainId: 80002,
      url: 'https://rpc-amoy.polygon.technology',
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    polygon: {
      chainId: 137,
      url: "https://polygon-rpc.com",
      accounts: [`${process.env.PRIVATE_KEY}`],
    }
  },
  sourcify: {
    enabled: true
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "amoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://amoy.polygonscan.com"
        }
      }
    ]
  }
};

export default config;
