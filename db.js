import mongoose from "mongoose";

const connectDB = async()=>{
  try {
  const conn = await mongoose.connect(process.env.MONGO_URI)
  console.log(`MongoDB connected: ${conn.connection.host}`);
} catch (err) {
  console.log("Database connection failed: ", err);
  process.exit(1); //Stop the app if DB fails
} 
};

export default connectDB;
