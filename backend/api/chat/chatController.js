const Chat = require("../../Models/ChatModel");
const User = require("../../Models/User");

module.exports = {
  async ascessChat(req, res) {
    try {
      const { userId } = req.body;
      if (!userId) {
        console.log("userId not found");
        return res
          .status(400)
          .json({ response: {}, responseMessage: "Userid Not found" });
      }

      var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: req.user._id } } },
          { users: { $elemMatch: { $eq: userId } } },
        ],
      })
        .populate("users", "-password") // this will give all the data of the users
        .populate("latestMessages");
      //  this will give the details of the lestest message but we want thte sender details to so we go one step deep

      // this will populate by going to the path inside the latest message
      isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
      });

      if (isChat.length > 0) {
        return res
          .status(200)
          .json({ response: isChat[0], responseMessage: "Chat found" });
      } else {
        var chatData = {
          chatName: "sender",
          isGroupChat: false, //  since it is a group chat so it will remain false
          users: [req.user._id, userId], //  it will store only two id since it is a one on one chat
        };

        const createdChat = await Chat.create(chatData);

        const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password",
        );

        return res.status(200).json({
          response: fullChat,
          responseMessage: "Chat created success",
        });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ response: {}, responseMessage: error.message });
    }
  },

  async fetchChat(req, res) {
    try {
      let response = await Chat.find({
        users: { $elemMatch: { $eq: req.user._id } },
      })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessages")
        .sort({ updatedAt: -1 });

      response = await User.populate(response, {
        path: "latestMessage.sender",
        select: "name pic email",
      });

      return res
        .status(200)
        .json({ response: response, responseMessage: "Chat Found Success" });
    } catch (error) {
      return res
        .status(500)
        .json({ response: {}, responseMessage: error.message });
    }
  },

  async createGroupChat(req, res) {
    try {
      let { users, name } = req.body;

      if (!users || !name) {
        return res.status(400).josn({
          response: {},
          responseMessage: "Please provide all the fields",
        });
      }

      users = JSON.parse(users); // to get users in the array formate

      if (users.length < 2) {
        return res.status(400).json({
          response: {},
          responseMessage: "More than 2 users are required to create a group",
        });
      }
      // this will add the current user that is loged in the the group
      users.push(req.user);

      const groupChat = await Chat.create({
        chatName: name,
        users: users,
        isgroupChat: true,
        groupAdmin: req.user._id, // give all  the ides even if you give full object it will extract the id but best practice to give id
      });

      const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      return res.status(200).json({
        response: fullGroupChat,
        responseMessage: "group created success",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ response: {}, responseMessage: error.message });
    }
  },

  async renameGroup(req, res) {
    try {
      let { chatId, chatName } = req.body;

      const updateGroup = await Chat.findByIdAndUpdate(
        chatId,
        { chatName: chatName },
        { new: true },
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      if (!updateGroup) {
        return res
          .status(400)
          .json({ response: {}, responseMessage: "Chat Not found" });
      } else {
        return res
          .status(200)
          .json({ response: updateGroup, responseMessage: "Group updated" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ response: {}, responseMessage: error.message });
    }
  },

  async addToGroup(req, res) {
    try {
      const { chatId, userId } = req.body;

      const response = await Chat.findByIdAndUpdate(
        chatId,
        { $push: { users: userId } },
        { new: true },
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      if (response) {
        return res
          .status(200)
          .json({ response: response, responseMessage: "user added" });
      } else {
        return res
          .status(400)
          .json({ response: {}, responseMessage: "Chat not found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ response: {}, responseMessage: error.message });
    }
  },

  async removeFromGroup(req, res) {
    try {
      const { chatId, userId } = req.body;

      const response = await Chat.findByIdAndUpdate(
        chatId,
        { $pull: { users: userId } },
        { new: true },
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      if (response) {
        return res
          .status(200)
          .json({ response: response, responseMessage: "user removed" });
      } else {
        return res
          .status(400)
          .json({ response: {}, responseMessage: "Chat not found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ response: {}, responseMessage: error.message });
    }
  },
};
