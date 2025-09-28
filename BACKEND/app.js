import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectMongoDB from "./config/mongoDB.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({}));
app.use(express.json());




app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/api", (req, res) => {
  res.json({ message: "API is working!" });
});

app.listen(PORT, () => {
  connectMongoDB(); // Assuming connectMongoDB is defined elsewhere
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
