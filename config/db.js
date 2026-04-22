import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Mongo Database Connected Successfully");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default ConnectDB;
