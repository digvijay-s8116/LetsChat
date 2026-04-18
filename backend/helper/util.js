const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = {
  getToken(payload) {
    // req.user = payload;
    return jwt.sign({ id: payload._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  },

  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  },
};
