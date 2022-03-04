import "reflect-metadata";
import express from "express";
import "./database";
import { routes } from "./routes";

const app = express();

app.use(express.json());

app.use(routes);

const port = process.env.PORT || 2016;

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
