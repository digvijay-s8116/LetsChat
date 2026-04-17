const mongoose = require("mongoose");

async function connectDb() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI_LOCAL);

    console.log("Mongodb Connected: ------>>>");
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = connectDb;
