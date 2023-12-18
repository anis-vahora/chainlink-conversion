import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ConversionPair from "./components/ConversionPair";
import Result from "./components/Result";
import "./App.css";
// require("dotenv").config();

const App = () => {
  const [selectedPair, setSelectedPair] = useState("BTC/USD");
  const [result, setResult] = useState("");
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://eth-sepolia.g.alchemy.com/v2/1_K_rLjkvOle_RreniPLPsx0JMOvqspA"
    );

    const contractAddress = "0x6D03816D4e6EC05438D01F4a858EC65703223763";
    const abi = require("./abis/PriceConsumerV3.json");
    const dataConsumerContract = new ethers.Contract(
      contractAddress,
      abi,
      provider
    );

    setContract(dataConsumerContract);
  }, []);

  const handleSelectPair = async (pair) => {
    setSelectedPair(pair);
    try {
      const conversionResult = await contract.getChainlinkDataFeedLatestAnswer(
        pair
      );
      const resultInUSD = Number(conversionResult.toString()) / 10 ** 8;
      setResult(resultInUSD.toFixed(2));
    } catch (error) {
      console.error("Error fetching conversion result:", error.message);
    }
  };

  return (
    <div className="app-container">
      <h1>Chainlink Pair Converter</h1>
      <ConversionPair
        pairs={["BTC/USD", "ETH/USD", "LINK/USD", "BTC/ETH"]}
        selectedPair={selectedPair}
        onSelectPair={handleSelectPair}
      />
      <Result result={result} selectedPair={selectedPair} />
    </div>
  );
};

export default App;
