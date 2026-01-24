import moongoose from "mongoose";

export const connectDB = async () => {
  try {
    const { MONGO_URI } = process.env;
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    const conn = await moongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully : ", conn.connection.host);
  } catch (error) {
    console.error("MongoDB connection failed: ", error);
    process.exit(1); // Exit process with failure
  }
};
