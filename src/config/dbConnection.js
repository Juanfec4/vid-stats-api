import mongoose from "mongoose";
import "dotenv/config";

//Establish connection to DB
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_CLIENT}`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
  } catch (e) {
    console.error(e);
  }
};

export default connectDB;
