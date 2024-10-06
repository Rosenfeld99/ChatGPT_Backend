import express from "express";
import ImageKit from "imagekit";
import cors from "cors";
import "./db/mongoConnect.js";
import path from "path";
import url, { fileURLToPath } from "url";
// import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import dotenv from "dotenv";
import chatsCtrl from "./controllers/chatsCtrl.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express'

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: [
      "https://rosenfeld99.github.io",
      "https://rosenfeld99.github.io/gpt-chat",
      "http://localhost:5173", // Local development frontend
      "https://chat-ai-eli-rosenfeld.netlify.app", // Production frontend
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.use(ClerkExpressRequireAuth());
app.use(express.json());

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "CHAT AI API",
      version: "1.0.0",
      description: "API for managing user chats",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./swagger/*.js"], // Path to API documentation
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.get("/api/test", chatsCtrl.testChat);

app.post("/api/chats/:userId", chatsCtrl.createChat);

app.get("/api/userchats/:userId", chatsCtrl.getUserChats);

app.get("/api/chats/:id/:userId", chatsCtrl.geteSingleChat);

app.put("/api/chats/:id/:userId", chatsCtrl.editChat);

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(401).json({ error: "Unauthenticated!" });
// });

// PRODUCTION
app.use(express.static(path.join(__dirname, "./public")));

// DEFUALTS PATH
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// LISTENER SERVER
app.listen(port, () => {
  console.log("Server running on 3000");
});
