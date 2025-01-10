import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./db/db.js";
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

app.use(cors({}));

connectDb().then(() => {
  app.listen(process.env.PORT || 8000, () => {
    console.log("app is listening on :" + process.env.PORT || 8000);
  });
});
