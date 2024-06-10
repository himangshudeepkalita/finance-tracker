import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import financialRecordRouter from "../src/routes/financial-records.js";
import cors from "cors";
import path from "path";

dotenv.config();

const __dirname = path.resolve();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({
  origin: 'http://127.0.0.1:5173'
}));


const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("CONNECTED TO MONGODB!"))
  .catch((err) => console.error("Failed to Connect to MongoDB:", err));

app.use("/financial-records", financialRecordRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
});