import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;
const MONGODB_URI = process.env.MONGODB_URI;

// Middlewares
app.use(express.json());

// Connection to DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`Connection to MongoDB successful`);
  })
  .catch((error) => {
    console.log(`Error: `, error);
  });

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
