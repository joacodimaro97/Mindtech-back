import mongoose from "mongoose";

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("\x1b[32m%s\x1b[0m", "Database connected to MongoDB")) // Texto verde para éxito
  .catch((err) => console.log("\x1b[31m%s\x1b[0m", err)); // Texto rojo para error

export default mongoose;
