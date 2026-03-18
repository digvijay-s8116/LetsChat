const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: "String",
      required: true,
    },
    email: {
      trpe: "String",
      required: true,
    },
    password: {
      type: "String",
      required: true,
    },
    pic: {
      type: String,
      required: true,
      default: "",
    },
  },
  {
    timeStamps: true,
  },
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
