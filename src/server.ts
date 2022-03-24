import "./container";
import "express-async-errors";
import "reflect-metadata";

import swaggerUi from "swagger-ui-express";
import express from "express";

import dbConnection from "./database";
import { routes } from "./routes";
import { AppError } from "./Classes/AppError";
import { isCelebrateError } from "celebrate";

const app = express();
const port = process.env.PORT || 2016;

const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      generationDate: err.getDate(),
    });
  }

  if (isCelebrateError(err)) {
    const fields = [];

    err.details.forEach((i) => fields.push(i.message));

    return res.status(400).json({
      message: err.message,
      fields,
    });
  }

  // Se for um erro desconhecido, retorna um erro 500
  return res.status(500).json({
    message: `Internal server error - ${err.message}`,
  });
};

app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(require("./swagger.json")));

app.listen(port, async () => {
  await dbConnection();

  console.log(`The server is running on port ${port}`);
});
