import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState("");

  const handleGenerateSteps = async () => {
    try {
      const response = await axios.post("http://localhost:5000/addition", {
        num1: num1,
        num2: num2,
      });
      setResult(JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
    <div className="app">
      <div className="head">
      <h1>Step Addition</h1>
      </div>
      <br/>
      <label className="label1">
        First Number:
        <input type="text" value={num1} onChange={(e) => setNum1(e.target.value)} className="input"/>
      </label>
      <br />
      <label className="label2">
        Second Number:
        <input type="text" value={num2} onChange={(e) => setNum2(e.target.value)} className="input" />
      </label>
      <br />
      <button onClick={handleGenerateSteps} className="button">Generate Steps</button>
      <br/>
      <label>Output:</label>
      <br/>
      <textarea rows={10} cols={50} value={result} readOnly className="text"></textarea>
      <br/>
    </div>
    </main>
  );
}

export default App;
