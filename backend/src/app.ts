import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route';

require('dotenv').config();
const mongodbUri = process.env.MONGODB_URI;
const port = process.env.PORT;

const app = express();

app.use(bodyParser.json());

app.use('/api/user', userRoutes);

mongoose
  .connect(mongodbUri)
  .then(() => {
    app.listen(port);
  })
  .catch((e: Error) => {
    console.error(e);
  });
