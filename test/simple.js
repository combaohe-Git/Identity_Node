const Protocol176 = artifacts.require("Protocol176");

contract("Protocol176", (accounts) => {
  it("should have a name", async () => {
    const instance = await Protocol176.deployed();
    assert.isNotNull(instance.name);
  });
});
