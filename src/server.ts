import "./container";
import "express-async-errors";
import "reflect-metadata";

import swaggerUi from "swagger-ui-express";
import express from "express";

import dbConnection from "./database";
import { routes } from "./routes";

const app = express();
const port = process.env.PORT || 2016;

const errorHandler = (err, req, res, next) => {
  if (err instanceof Error) {
    return res.status(500).json({
      message: err.message || "Internal Server Error: no message provided",
    });
  }
  next();
};

app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(require("./swagger.json")));

app.listen(port, async () => {
  await dbConnection();

  console.log(`The server is running on port ${port}`);
});
