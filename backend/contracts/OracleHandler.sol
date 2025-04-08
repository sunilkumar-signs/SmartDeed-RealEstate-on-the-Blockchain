// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract OracleHandler {
    int256 public latestPrice;
    address public oracle;

    constructor() {
        oracle = msg.sender;
    }

    modifier onlyOracle() {
        require(msg.sender == oracle, "Not authorized");
        _; 
    }

    function updatePrice(int256 _price) public onlyOracle {
        latestPrice = _price;
    }

    function getLatestPrice() public view returns (int256) {
        return latestPrice;
    }
}
