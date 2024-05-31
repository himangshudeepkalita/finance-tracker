import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import financialRecordRouter from "../src/routes/financial-records.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("CONNECTED TO MONGODB!"))
  .catch((err) => console.error("Failed to Connect to MongoDB:", err));

app.use("/financial-records", financialRecordRouter);

app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
});