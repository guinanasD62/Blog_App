import express from "express";
import mongoose from "mongoose";
import { Request, Response } from "express";
import blogRoute from "./routes/blog.route";
import writerRoute from "./routes/writer.route";

const app = express();

//connect to database
const connectToDB = require('./config/db')
connectToDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", blogRoute);
app.use("/", writerRoute);

const PORT = process.env.PORT || 3700;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


