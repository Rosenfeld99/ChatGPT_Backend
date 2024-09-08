import express from "express";
import ImageKit from "imagekit";
import cors from "cors";
import "./db/mongoConnect.js";
import Chat from "./models/chat.js";
import UserChats from "./models/userChat.js";

const port = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.post("/api/chats", async (req, res) => {
  console.log("in req");

  const { text, userId } = req.body;

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
    return res.status(201).json({ chatId: newChat._id });
    
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating chat!");
  }
});

app.listen(port, () => {
  console.log("Server running on 3000");
});
