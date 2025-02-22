import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Homepage.css";
const Homepage = () => {
  const [playerInput, setPlayerInput] = useState("");
  const [result, setResult] = useState("");

  console.log(result);
  const handleClick = async () => {
    /**
     * This function sends the playerInput to the server and gets the result
     * The result is then set to the result state
     */
    try {
      //Send playerInput to the server at PORT 5000 and gets the result
      const response = await axios.post("http://localhost:5000/run-python", {
        playerInput,
      });
      setResult(response.data.result);
    } catch (error) {
      console.error("Error calling Python script:", error);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">NBA Player Comparison</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter text..."
            onChange={(e) => setPlayerInput(e.target.value)}
            className="input-field"
          />
          <button onClick={handleClick} className="submit-button">
            Submit
          </button>
        </div>
        {result && (
          <div className="results-container">
            <h2>Most Similar Players:</h2>
            <ul>
              {(result).map((player, index) => (
                <li key={index}>
                  {player[0]} - Similarity Score: {player[1].toFixed(3)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
