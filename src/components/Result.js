// Result.js
import React from "react";
import "./Result.css";

const Result = ({ result, selectedPair }) => {
  return (
    <div className="result-display-container">
      <label>Conversion Result:</label>
      <input
        type="text"
        value={`1 ${selectedPair.split("/")[0]} = ${result} ${
          selectedPair.split("/")[1]
        }`}
        readOnly
      />
    </div>
  );
};

export default Result;
