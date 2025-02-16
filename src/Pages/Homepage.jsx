import React, { useEffect, useState } from "react";


const Homepage = () => {

  const [playerInput, setPlayerInput] = useState("");

  const spawner = require('child_process').spawn;

  const python_process = spawner('python', ['../src/Scripts/CosineSim.py', playerInput]); //Passes what we want to pass to the python script 

  
  
  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <input
          type="text"
          placeholder="Enter text..."
          className="w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={python_process}>

        </button>
      </div>
    </div>
  );
};

export default Homepage;
