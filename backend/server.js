const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDb");
const userRoutes = require("./api/user/userRoutes");
const chatRoutes =  require("./api/chat/chatRoutes")

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

//  use this middleware to solve CORS error
const cors = require("cors");
app.use(cors());

// call function for env configuration
dotenv.config();

// call this function to connect dataBase
connectDb();

// middleware to accept data in req
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is up and running ");
});


// all api related to user and search user
app.use("/api/user", userRoutes);

// all api related to chats
app.use("/api/chats",chatRoutes)

// If not above route Found or have any error then check in the middle ware
app.use(notFound); // this will handle any unknown URLs
app.use(errorHandler); //  this will handle any error

app.listen(5000, () => {
  console.log("Server is runnig on port number 5000");
});
