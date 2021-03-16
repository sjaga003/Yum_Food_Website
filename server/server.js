import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//connect to mongoose
const CONNECTION_URL = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.x4w0b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`express server running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });

mongoose.set('useFindAndModify', false);

//require route
