import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});
import mongoose from "mongoose";
const MongoDB = async () => {
  await mongoose
    .connect(process.env.MONGO_DB)
    .then(() => {
      console.log("database connected");
    })
    .catch(() => {
      console.log("database not connected");
    });
};
export default MongoDB;
