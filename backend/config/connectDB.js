import mongoose from "mongoose";
import dotenv from "dotenv";

export const connectDB = async (params) => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB CONNECTED:" + conn.connection.host);
  } catch (error) {
    console.error("Error in connecting DB");
    process.exit(1);
  }
};
