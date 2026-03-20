const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDb");
const userRoutes = require("./api/user/userRoutes");

dotenv.config();

connectDb();
const app = express();

app.use(express.json());

const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("server is up and running ");
});

app.use("/api/user", userRoutes);

app.listen(5000, () => {
  console.log("Server is runnig on port number 5000");
});
