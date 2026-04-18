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
        isgroupChat: false,
        $and: [
          { users: { $elementMatch: { $eq: req.user._id } } },
          { users: { $elementMatch: { $eq: userId } } },
        ],
      })
        .populate("users", "-password") // this will give all the data of the users
        .populate("latestMessage");
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
          chatName: "sender", // since you are inetiating the chat so you will become the sender first
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
      return res
        .status(500)
        .json({ response: {}, responseMessage: error.message });
    }
  },

  async fetchChat() {},
};
