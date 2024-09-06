import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/connectDB.js";
import bodyParser from "body-parser";
import auth from "./routes/users.js";
import inventory from "./routes/inventory.js";


const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust the origin as needed
  })
);
app.use("/auth", auth);

app.use("/inventory" , inventory)

app.listen(PORT, () => {
  console.log(`Port running at ${PORT}`);
  connectDB();
});
