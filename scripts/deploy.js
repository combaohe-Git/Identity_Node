const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Protocol176 = await ethers.getContractFactory("Protocol176");
  const protocol176 = await Protocol176.deploy();

  await protocol176.deployed();

  console.log("Protocol176 deployed to:", protocol176.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
