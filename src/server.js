import express from "express";
import pkg from "body-parser";
import cors from "cors";
import initRoute from "./utils/route.js";

export const app = express();
const port = process.env.PORT || 3333;

const { json, urlencoded } = pkg;

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors({ origin: true }));
initRoute(app);

export const start = () => {
  try {
    app.listen(port, () => {
      console.log(`REST API on http://localhost:${port}`);
    });
  } catch (e) {
    console.error(e);
  }
};
