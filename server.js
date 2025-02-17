const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Listens for a POST request from the frontend
//**
// Req = {playerInput: "playerInput"}
// Res = {result: "result"}
//  */
app.post("/run-python", (req, res) => {
  const { playerInput } = req.body;
  console.log("Searching for player:", playerInput);

  const pythonProcess = spawn("python3", [
    "./src/Scripts/CosineSim.py",
    playerInput,
  ]);

  let resultData = "";

  pythonProcess.stdout.on("data", (data) => {
    console.log(data.toString());
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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
