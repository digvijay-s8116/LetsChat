const User = require("../../Models/user");
const { getToken, hashPassword } = require("../../helper/util");

module.exports = {
  async userRegister(req, res) {
    try {
      const { name, email, password, pic } = req.body;

      if (!name || !email || !password) {
        await res
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
        await res.status(200).json({
          response: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            pic: newUser.pic,
            token: getToken(newUser._id),
          },
          responseMessage: "User created Succcess !!!!!",
        });
      }
    } catch (error) {
      console.log(error.message);
      await res.status(500).json({ responseMessage: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const findUser = await User.findOne({ email: email, password: password });
    } catch (error) {
      await res
        .status(500)
        .json({ response: {}, responseMessage: error.message });
    }
  },
};
