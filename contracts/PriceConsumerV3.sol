// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {
    mapping(string => AggregatorV3Interface) internal dataFeeds;

    constructor() {
        // Network: Sepolia

        // Aggregator: BTC/USD
        dataFeeds["BTC/USD"] = AggregatorV3Interface(
            0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43
        );

        // Aggregator: ETH/USD
        dataFeeds["ETH/USD"] = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );

        // Aggregator: LINK/USD
        dataFeeds["LINK/USD"] = AggregatorV3Interface(
            0xc59E3633BAAC79493d908e63626716e204A45EdF
        );

        // Aggregator: BTC/ETH
        dataFeeds["BTC/ETH"] = AggregatorV3Interface(
            0x5fb1616F78dA7aFC9FF79e0371741a747D2a7F22
        );
    }

    function getChainlinkDataFeedLatestAnswer(
        string calldata pair
    ) external view returns (uint) {
        AggregatorV3Interface dataFeed = dataFeeds[pair];
        require(address(dataFeed) != address(0), "Invalid conversion pair");

        (
            uint80 roundID,
            int answer,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = dataFeed.latestRoundData();

        return uint(answer);
    }
}
