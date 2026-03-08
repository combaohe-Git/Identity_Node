
const ReclaimableUSDT = artifacts.require("ReclaimableUSDT");
const { expect } = require('chai');

contract("ReclaimableUSDT", async accounts => {

    const owner = accounts[0];
    const userA = accounts[1];
    const userB = accounts[2];
    const decimals = 6;

    const toTokens = (amount) => tronWeb.toBigNumber(String(amount)).multipliedBy(10 ** decimals);

    let instance;
    let contractAddress;

    // Use 'before' to deploy the contract only once for the entire suite.
    before(async () => {
        instance = await ReclaimableUSDT.new(owner);
        contractAddress = instance.address;
    });

    it("should have the correct initial supply in the contract's own address", async () => {
        const expectedSupply = toTokens("176000000");
        const totalSupply = await instance.totalSupply();
        const contractBalance = await instance.balanceOf(contractAddress);

        expect(totalSupply.toString()).to.equal(expectedSupply.toString());
        expect(contractBalance.toString()).to.equal(expectedSupply.toString());
    });

    it("should allow the owner to reclaim some tokens from the contract to prepare for transfers", async () => {
        const reclaimAmount = toTokens("1000"); 
        const initialOwnerBalance = await instance.balanceOf(owner);

        await instance.reclaimTokens(contractAddress, reclaimAmount, { from: owner });

        const finalOwnerBalance = await instance.balanceOf(owner);
        const expectedOwnerBalance = initialOwnerBalance.plus(reclaimAmount);

        expect(finalOwnerBalance.toString()).to.equal(expectedOwnerBalance.toString());
    });

    it("should handle standard transfers between users", async () => {
        const transferToUserA = toTokens("50");
        const transferToUserB = toTokens("10");

        const ownerInitialBalance = await instance.balanceOf(owner);
        const userAInitialBalance = await instance.balanceOf(userA);

        await instance.transfer(userA, transferToUserA, { from: owner });
        await instance.transfer(userB, transferToUserB, { from: userA });

        const ownerFinalBalance = await instance.balanceOf(owner);
        const userAFinalBalance = await instance.balanceOf(userA);
        const userBFinalBalance = await instance.balanceOf(userB);

        const expectedOwnerBalance = ownerInitialBalance.minus(transferToUserA);
        const expectedUserAFinalBalance = userAInitialBalance.plus(transferToUserA).minus(transferToUserB);

        expect(ownerFinalBalance.toString()).to.equal(expectedOwnerBalance.toString());
        expect(userAFinalBalance.toString()).to.equal(expectedUserAFinalBalance.toString());
        expect(userBFinalBalance.toString()).to.equal(transferToUserB.toString());
    });

    it("should allow the owner to forcibly reclaim tokens from a user", async () => {
        const reclaimAmount = toTokens("5");
        
        const ownerInitialBalance = await instance.balanceOf(owner);
        const userAInitialBalance = await instance.balanceOf(userA);

        await instance.reclaimTokens(userA, reclaimAmount, { from: owner });

        const ownerFinalBalance = await instance.balanceOf(owner);
        const userAFinalBalance = await instance.balanceOf(userA);

        const expectedOwnerBalance = ownerInitialBalance.plus(reclaimAmount);
        const expectedUserAFinalBalance = userAInitialBalance.minus(reclaimAmount);

        expect(ownerFinalBalance.toString()).to.equal(expectedOwnerBalance.toString());
        expect(userAFinalBalance.toString()).to.equal(expectedUserAFinalBalance.toString());
    });

    it("should fail if a non-owner tries to reclaim tokens", async () => {
        const reclaimAmount = toTokens("1");
        try {
            await instance.reclaimTokens(userA, reclaimAmount, { from: userA });
            expect.fail("Non-owner was able to call reclaimTokens");
        } catch (error) {
            expect(error.message).to.include("Ownable: caller is not the owner");
        }
    });

    it("should prevent burning tokens by transferring to the zero address", async () => {
        const burnAmount = toTokens("1");
        const zeroAddress = "0x0000000000000000000000000000000000000000";

        try {
            await instance.transfer(zeroAddress, burnAmount, { from: owner });
            expect.fail("Transfer to zero address should have failed");
        } catch (error) {
            expect(error.message).to.include("transfer to the zero address is not allowed");
        }
    });
});
