// server.js
import express from "express";
import cors from "cors";
import { connectToMongoDB } from "./mongoDB/connectToMongoDb.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

 app.use('/api/users', userRoutes);

const startServer = async () => {
  await connectToMongoDB();

  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Yoo Server is running on port ${process.env.PORT || 5000}`);
  });
};

startServer();

