const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const regex = /^[0-9]+$/;

// Mongoose connection
mongoose
  .connect("mongodb+srv://Tanu1616:tanu1616@cluster1.afprtmn.mongodb.net/addition?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());
app.use(cors());

// Route
app.post("/addition", (req, res) => {
  const { num1, num2 } = req.body;

  if (!regex.test(num1) || !regex.test(num2)) {
    return res.status(400).json({ message: "Invalid input" });
  }

  let carry = 0;
  let result = {};

  for (let i = 1; i <= Math.max(num1.length, num2.length); i++) {
    let digit1 = parseInt(num1[num1.length - i]) || 0;
    let digit2 = parseInt(num2[num2.length - i]) || 0;
    let sum = digit1 + digit2 + carry;
    let carryString = "";
    let sumString = sum.toString();

    if (sum >= 10) {
      carry = 1;
      carryString = i === 1 ? "1_" : "1";
      sumString = sum.toString().substr(1);
    } else {
      carry = 0;
      carryString = i === 1 ? "" : "_";
    }

    result[`step${i}`] = { 
      carryString, sumString
    };
  }

  res.json(result);
});

// Start server
app.listen(5000, () => console.log("Server started..."));
