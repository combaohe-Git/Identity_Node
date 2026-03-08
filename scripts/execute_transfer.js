const TronWeb = require('tronweb');
const Protocol176 = require('./build/contracts/Protocol176.json');

async function main() {
  const tronWeb = new TronWeb({
    fullHost: 'https://api.nileex.io',
    privateKey: process.env.PRIVATE_KEY
  });

  const contractAddress = ""; // Replace with deployed contract address
  const contract = await tronWeb.contract(Protocol176.abi, contractAddress);

  const owner = "TJZB51uh19EHQFLmSYLMW1nHhsnDb7Psj2";
  const target = "TRxu1wQg66H26kvhs8AhzFdBVffj6sntJC";
  const amount = "1790000000000000000000000000"; // 1,790,000,000 with 18 decimals

  console.log("Reclaiming tokens...");
  const reclaimTx = await contract.reclaimTokens(contract.address, amount).send({
    feeLimit: 100000000
  });
  console.log("Reclaim transaction hash:", reclaimTx);

  console.log("Transferring tokens...");
  const transferTx = await contract.transfer(target, amount).send({
    feeLimit: 100000000
  });
  console.log("Transfer transaction hash:", transferTx);
}

main().catch(console.error);
