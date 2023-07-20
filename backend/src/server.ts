import express, { Application, Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRouter from "./routes/products";
import leadsRouter from "./routes/leads";
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 4000;

const mongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://mongo:mongo@simplicoding.4u97duj.mongodb.net/?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());

//Router
app.use("/api", productRouter);
app.use("/api", leadsRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });

export default app;
