
const Protocol176 = artifacts.require("Protocol176");

contract("Protocol176 Interaction Test", async accounts => {

  it("should have the correct initial supply for the recipient", async () => {
    // The address of the deployed contract on the Shasta network.
    const contractAddress = "TJGFDCb51nV4oALnJyjP72qenEb2ofTtWp";
    const recipientAddress = "TJZB51uh19EHQFLmSYLMW1nHhsnDb7Psj2";

    // Get the contract instance.
    const instance = await Protocol176.at(contractAddress);

    // Get the balance of the recipient.
    const balance = await instance.balanceOf(recipientAddress);
    
    // The expected balance (176 million tokens with 18 decimals).
    const expectedBalance = "176000000000000000000000000";

    // Assert that the balance is correct by comparing their string representations.
    assert.equal(balance.toString(), expectedBalance, "The recipient did not receive the initial supply.");
  });
});
