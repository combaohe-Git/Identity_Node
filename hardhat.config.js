
require("@nomicfoundation/hardhat-toolbox");

const config = {
  solidity: "0.8.20",
  networks: {}
};

if (process.env.PRIVATE_KEY && process.env.RPC_URL) {
  config.networks.mainnet = {
    url: process.env.RPC_URL,
    accounts: [process.env.PRIVATE_KEY]
  };
}

module.exports = config;
