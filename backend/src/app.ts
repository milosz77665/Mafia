import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';

require('dotenv').config();
const mongodbUri = process.env.MONGODB_URI;
const port = process.env.PORT;

const app = express();

app.use(bodyParser.json());

mongoose
  .connect(mongodbUri)
  .then(() => {
    app.listen(port);
  })
  .catch((e: Error) => {
    console.error(e);
  });
