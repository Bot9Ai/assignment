require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
const chatRoutes = require("./routes/chatRoutes.js");

app.use("/api", chatRoutes);

app.listen(4000, () => {
  console.log("server started");
});
