import express, { Application, Request, Response } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRouter from './routes/products';
import leadsRouter from './routes/leads';
dotenv.config();

const app: Application = express();
const port = 4000;

app.use(cors());
app.use(express.json());

//Router
app.use('/api', productRouter);
app.use('/api', leadsRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

mongoose
  .connect('mongodb://localhost:27017/simpli-coding-challenge', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit the application if MongoDB connection fails
  });

export default app;
