import UserChats from "../models/userChat.js";
import Chat from "../models/chat.js";

const chatCtrl = {
  testChat: (req, res) => {
    return res.json({ msg: "test working!!!" });
  },
  createChat: async (req, res) => {
    const userId = req.params.userId;
    const { text } = req.body;

    try {
      // CREATE A NEW CHAT
      const newChat = new Chat({
        userId: userId,
        history: [{ role: "user", parts: [{ text }] }],
      });

      const savedChat = await newChat.save();

      // CHECK IF THE USERCHATS EXISTS
      const userChats = await UserChats.find({ userId: userId });

      // IF DOESN'T EXIST CREATE A NEW ONE AND ADD THE CHAT IN THE CHATS ARRAY
      if (!userChats.length) {
        const newUserChats = new UserChats({
          userId: userId,
          chats: [
            {
              _id: savedChat._id,
              title: text.substring(0, 40),
            },
          ],
        });

        await newUserChats.save();
      } else {
        // IF EXISTS, PUSH THE CHAT TO THE EXISTING ARRAY
        await UserChats.updateOne(
          { userId: userId },
          {
            $push: {
              chats: {
                _id: savedChat._id,
                title: text.substring(0, 40),
              },
            },
          }
        );
      }

      console.log("Chat has been added successfully");
      res.status(201).send(newChat._id);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error creating chat!");
    }
  },
  geteSingleChat: async (req, res) => {
    const userId = req.params.userId;

    try {
      const chat = await Chat.findOne({ _id: req.params.id, userId });

      res.status(200).send(chat);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error fetching chat!");
    }
  },
  editChat: async (req, res) => {
    const userId = req.params.userId;

    const { question, answer, img } = req.body;

    const newItems = [
      ...(question
        ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
        : []),
      { role: "model", parts: [{ text: answer }] },
    ];

    try {
      const updatedChat = await Chat.updateOne(
        { _id: req.params.id, userId },
        {
          $push: {
            history: {
              $each: newItems,
            },
          },
        }
      );
      res.status(200).send(updatedChat);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error adding conversation!");
    }
  },
  getUserChats: async (req, res) => {
    try {
      const userId = req.params.userId;
      const userChats = await UserChats.find({ userId });
      res.status(200).send(userChats[0]?.chats || []);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error fetching user chats!");
    }
  },
  deleteChat: async (req, res) => {
    const userId = req.params.userId;
    const chatId = req.params.id; 

    try {
      // Delete the chat from the Chat collection
      await Chat.deleteOne({ _id: chatId, userId });

      // Remove the chat from the UserChats
      await UserChats.updateOne(
        { userId: userId },
        {
          $pull: {
            chats: { _id: chatId },
          },
        }
      );

      res.status(200).send("Chat deleted successfully!");
    } catch (err) {
      console.log(err);
      res.status(500).send("Error deleting chat!");
    }
  },
};

export default chatCtrl;
