const express = require("express");     // Web framework for Node.js - handles routing, middleware, server setup
const cors = require("cors");           //  allows frontend to call backend
const bodyParser = require("body-parser"); // Parses incoming request bodies (needed for POST requests)
const { spawn } = require("child_process"); // Allows Node.js to run other processes like Python


const app = express();
app.use(cors());
app.use(bodyParser.json());

/** Listens for a POST request from the frontend
 * Req = {playerInput: "playerInput"}
 * Res = {result: "result"}
 */
app.post("/run-python", (req, res) => {
  const { playerInput } = req.body;

  /** Create a new Python process to run our script
   This is equivalent to running in terminal:
   python3 ./src/Scripts/CosineSim.py playerInput
  */
  const pythonProcess = spawn("python3", [
    "./src/Scripts/CosineSim.py", // Path to our Python script
    playerInput, // Player name passed as command line argument
  ]);

  let resultData = "";

  /** Listens for the output of the Python script and appends it to the resultData string
   * */
  pythonProcess.stdout.on("data", (data) => {
    resultData += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python Error: ${data}`);
    // Don't send response here, store the error
    resultData = null;
  });

  
  pythonProcess.on("close", (code) => {
    if (resultData === null) {
      return res.status(500).json({ error: "Python script error" });
    }

    try {
      const parsedData = JSON.parse(resultData.trim());
      res.json({ result: parsedData });
    } catch (error) {
      console.error("Error parsing Python output:", error);
      res.status(500).json({ error: "Failed to parse results" });
    }
  });
});

const PORT = 5000;
/**Starts the server on port 5000 and listens for requests, the callback function is called when the server is running
 * app.listen() starts the express server and opens a port on your computer, and begins accepting HTTP requests
 * */
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
