const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      required: false,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
