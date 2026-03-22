const User = require("../../Models/user");
const bcrypt = require("bcrypt");
const { getToken, hashPassword } = require("../../helper/util");

module.exports = {
  async userRegister(req, res) {
    try {
      const { name, email, password, pic } = req.body;

      if (!name || !email || !password) {
        res
          .send(400)
          .json({ response: {}, responseMessage: "Give all the fields" });
      }

      const userExists = await User.findOne({ email });

      if (userExists) {
        res.status(400).json({ response: {}, responseMessage: "User found" });
      }

      const newUser = await User.create({
        name,
        email,
        password: await hashPassword(password),
        pic,
      });

      if (newUser) {
        res.status(200).json({
          response: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            pic: newUser.pic,
            token: getToken(newUser),
          },
          responseMessage: "User created Succcess !!!!!",
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ responseMessage: error.message });
    }
  },

  async userLogin(req, res) {
    try {
      const { email, password } = req.body;

      const userFound = await User.findOne({ email: email });

      if (!userFound) {
        return res
          .status(404)
          .json({ response: {}, responseMessage: "Email not Found" });
      }

      let checkPassword = await bcrypt.compare(password, userFound.password);

      if (!checkPassword) {
        return res
          .status(401)
          .json({ response: {}, responseMessage: "Password not matched" });
      }

      return res.status(200).json({
        response: {
          _id: userFound._id,
          name: userFound.name,
          email: userFound.email,
          token: getToken(userFound),
        },
      });
    } catch (error) {
      res.status(500).json({ response: {}, responseMessage: error.message });
    }
  },
};
