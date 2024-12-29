import express from 'express';
import mongoose from 'mongoose';

require('dotenv').config();
const mongodbUri = process.env.MONGODB_URI;
const port = process.env.PORT;

const app = express();

mongoose
  .connect(mongodbUri)
  .then(() => {
    app.listen(port);
  })
  .catch((e: Error) => {
    console.error(e);
  });
