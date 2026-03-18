const express = require("express");

const app = express();
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("server is up and running ");
});

app.listen(5000, () => {
  console.log("Server is runnig on port number 5000");
});
 