import React, { useEffect, useState } from "react";
import axios from "axios";

const Homepage = () => {
  const [playerInput, setPlayerInput] = useState("");
  const [result, setResult] = useState("");

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
    <div>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <input
          type="text"
          placeholder="Enter text..."
          onChange={(e) => setPlayerInput(e.target.value)}
          className="w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleClick}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Homepage;
