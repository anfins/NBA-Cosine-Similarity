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
  //Gets the playerInput from the frontend
  const { playerInput } = req.body;
  console.log(playerInput);

  // Spawn a Python process
  const pythonProcess = spawn("python3", [
    "./src/Scripts/CosineSim.py",
    playerInput,
  ]);

  let resultData = "";
  pythonProcess.stdout.on("data", (data) => {
    resultData += data.toString();
  });
  console.log(resultData);

  pythonProcess.on("close", () => {
    res.json({ result: resultData.trim() });
  });

  pythonProcess.stderr.on("data", (data) => {
    res.status(500).json({ error: data.toString() });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
