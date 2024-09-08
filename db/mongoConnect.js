import mongoose from "mongoose";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_CONNECTION);
  console.log("connect to mongoDB");
}
