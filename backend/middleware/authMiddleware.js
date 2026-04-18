const jwt = require("jsonwebtoken");
const User = require("../Models/User");

module.exports = {
  async protect(req, res, next) {
    try {
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: decode.id }).select("-password");

        // if user find store the data in the req
        if (user) {
          req.user = user;
          next();
        } else {
          return res
            .status(404)
            .json({ response: {}, responseMessage: "user not found" });
        }
      } else {
        return res
          .status(400)
          .json({ response: {}, responseMessage: "No token found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ response: {}, responseMessage: error.message });
    }
  },
};
