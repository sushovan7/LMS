import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connectDb() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.MONGODB_DB_NAME}`
    );
    if (!connectionInstance) {
      console.log("mongodb connection failed");
    } else {
      console.log(
        "mongodb connected,connection string is :",
        connectionInstance.connection.host
      );
    }
  } catch (error) {
    console.log("mongodb connection failed", error);
  }
}
