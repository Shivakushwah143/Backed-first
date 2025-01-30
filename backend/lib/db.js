import mongoose from "mongoose";

export const conectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongo_uri);
    console.log("connectDb");
    
    console.log(`mongoDb connected :${conn.connection.host || "localhost"}`);
   
  } catch (error) {
    console.log("Error connecting to mongo db");
    process.exit(1);
  }
};
