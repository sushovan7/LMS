import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./db/db.js";
import { rootRouter } from "./routes/index.js";
import cookieParser from "cookie-parser";
const app = express();

dotenv.config();

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    limit: "16kb",
    extended: true,
  })
);

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1", rootRouter);

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("app is listening on :", process.env.PORT || 8000);
    });
  })
  .catch((error) => {
    console.log("mongodb connection failed", error);
  });
