// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";


contract OracleHandler {
    AggregatorV3Interface internal priceFeed;

    constructor() {
        // ETH/USD price feed address on Sepolia
        priceFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
    }

    function getLatestPrice() public view returns (int256) {
        (
            , int256 price,,,
        ) = priceFeed.latestRoundData();
        return price; // returns price in 8 decimals (e.g. 348000000000 = $3480)
    }
}
