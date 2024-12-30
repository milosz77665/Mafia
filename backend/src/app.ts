import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route';
import cors from 'cors';

require('dotenv').config();
const mongodbUri = process.env.MONGODB_URI;
const port = process.env.PORT;
const clientUrl = process.env.CLIENT_URL;

const app = express();

app.use(
  cors({
    origin: clientUrl,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Auth-Token'],
  })
);
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
