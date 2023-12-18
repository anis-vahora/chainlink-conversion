// ConversionPair.js
import React from "react";
import "./ConversionPair.css";

const ConversionPair = ({ pairs, selectedPair, onSelectPair }) => {
  return (
    <div className="conversion-pair-container">
      <label>Select Conversion Pair:</label>
      <select
        value={selectedPair}
        onChange={(e) => onSelectPair(e.target.value)}
      >
        {pairs.map((pair) => (
          <option key={pair} value={pair}>
            {pair}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ConversionPair;
