const User = require("../../Models/User");
const bcrypt = require("bcrypt");
const { getToken, hashPassword } = require("../../helper/util");

module.exports = {
  // this api is used for newuser Registration
  async userRegister(req, res) {
    try {
      // console.log("sadfsadf");
      const { name, email, password, pic } = req.body;

      if (!name || !email || !password) {
        return res
          .send(400)
          .json({ response: {}, responseMessage: "Give all the fields" });
      }

      const userExists = await User.findOne({ email });

      if (userExists) {
        console.log("email exists");
        return res
          .status(400)
          .json({ response: {}, responseMessage: "Email Already Exists" });
      }

      const newUser = await User.create({
        name,
        email,
        password: await hashPassword(password),
        pic,
      });

      if (newUser) {
        console.log("User created success", newUser);
        return res.status(200).json({
          response: {
            // _id: newUser._id,
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
      return res.status(500).json({ responseMessage: error.message });
    }
  },

  // this api is used for User login
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
          .json({ response: {}, responseMessage: "Invalid Credentials" });
      }

      return res.status(200).json({
        response: {
          _id: userFound._id,
          name: userFound.name,
          email: userFound.email,
          pic: userFound.pic,
          token: getToken(userFound),
        },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ response: {}, responseMessage: error.message });
    }
  },

  // get query data from the params
  async allUsers(req, res) {
    try {
      let search = req.query.search;

      // write a query here like if use give a search query then search it in the name and email using regex and or
      const query = search
        ? {
            $or: [
              { name: { $regex: search, $options: "i" } },
              { email: { $regex: search, $options: "i" } },
            ],
          }
        : {};

      console.log(req.user);
      let allusers = await User.find(query).find({
        _id: { $ne: req.user._id },
      });
      // it will remove the User who is searching.

      if (allusers.length == 0) {
        return res
          .status(200)
          .json({ response: allusers, responseMessage: "No User found" });
      }

      return res
        .status(200)
        .json({ response: allusers, responseMessage: "User found" });
    } catch (error) {
      return res
        .status(500)
        .json({ response: {}, responseMessage: error.message });
    }
  },
};
