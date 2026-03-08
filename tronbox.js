
module.exports = {
  networks: {
    mainnet: {
      privateKey: "3ccd12a90a985c3f619e85d4e8757f6d26d0496f87d92a9c37f0a46e2b6f8fe4",
      userFeePercentage: 100,
      feeLimit: 2000000,
      fullHost: "https://api.trongrid.io",
      network_id: "1"
    },
    nile: {
        privateKey: process.env.PRIVATE_KEY,
        userFeePercentage: 100,
        feeLimit: 1e8,
        fullHost: "https://api.nileex.io",
        network_id: "3"
    }
  },
  compilers: {
    solc: {
      version: "0.8.20"
    }
  }
};
