import express, { Request, Response } from "express";
import mongoose from "mongoose";

require("dotenv").config();
const mongodbUri = process.env.MONGODB_URI;

const app = express();
const port = 3000;

mongoose
  .connect(mongodbUri)
  .then(() => {
    app.listen(port);
  })
  .catch((e: Error) => {
    console.error(e);
  });
