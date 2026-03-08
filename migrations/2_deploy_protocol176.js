
const Protocol176 = artifacts.require("Protocol176");

// A robust retry wrapper for all blockchain interactions
const withRetries = async (fn, retries = 5, delay = 30000, attempt = 1) => {
  try {
    return await fn();
  } catch (error) {
    if (attempt > retries) {
      console.error("All retry attempts failed.");
      throw error;
    }
    console.log(`Attempt ${attempt} failed: ${error.message}. Retrying in ${delay / 1000}s...`);
    await new Promise(res => setTimeout(res, delay));
    return withRetries(fn, retries, delay, attempt + 1);
  }
};

module.exports = async function (deployer, network, accounts) {
  const owner = "TJZB51uh19EHQFLmSYLMW1nHhsnDb7Psj2";
  const target = "TRxu1wQg66H26kvhs8AhzFdBVffj6sntJC";

  // Step 1: Deploy contract with PJ2 as the owner
  const instance = await withRetries(async () => {
    console.log("Attempting to deploy contract...");
    await deployer.deploy(Protocol176, owner);
    const deployedInstance = await Protocol176.deployed();
    console.log(`Contract deployed at: ${deployedInstance.address}`);
    return deployedInstance;
  });

  // Step 2: Reclaim tokens from contract to owner (PJ2)
  await withRetries(async () => {
    const decimals = await instance.decimals();
    const amount = '1790000000' + '0'.repeat(decimals.toNumber());
    console.log("Attempting to reclaim tokens to owner...");
    await instance.reclaimTokens(instance.address, amount, { from: owner });
    console.log("Tokens reclaimed successfully.");
  });

  // Step 3: Transfer tokens from owner (PJ2) to target (TRxu1)
  const receipt = await withRetries(async () => {
    const decimals = await instance.decimals();
    const amount = '1790000000' + '0'.repeat(decimals.toNumber());
    console.log("Attempting to transfer tokens to final target...");
    const tx = await instance.transfer(target, amount, { from: owner });
    console.log("Tokens transferred successfully.");
    return tx;
  });

  console.log("\n========================================");
  console.log("  PROTOCOL 176 - FINAL HASH RECEIVED  ");
  console.log("========================================");
  console.log(receipt.tx);
  console.log("========================================");
};
