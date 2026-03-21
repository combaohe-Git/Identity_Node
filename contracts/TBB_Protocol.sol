// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title TBB Carbon Protocol (Official TRC-20 Standard)
 * 符合波场官方标准，拒绝假数字逻辑
 */
contract TBB_Protocol {
    string public name = "TBB Carbon";
    string public symbol = "TBB";
    uint8 public decimals = 18;
    uint256 public totalSupply = 17600000000 * 10**18; // 176亿枚起步

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address to, uint256 value) public returns (bool success) {
        require(balanceOf[msg.sender] >= value);
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }
}
