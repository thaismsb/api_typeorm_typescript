import "express-async-errors";

import "reflect-metadata";
import express, { NextFunction } from "express";
import "./container";
import "./database";
import { routes } from "./routes";
const swaggerUi = require("swagger-ui-express");

const app = express();
const errorHandler = (err, req, res, next) => {
  if (err instanceof Error) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(require("./swagger.json")));

const port = process.env.PORT || 2016;
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
