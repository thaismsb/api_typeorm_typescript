import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { GetUserByIdController } from "./controllers/GetUserByIdController";
import { celebrate, Joi, Segments } from "celebrate";
import { UpdateUserController } from "./controllers/UpdateUserController";
import { DeleteUserController } from "./controllers/DeleteUserController";
import { GetUserByNameAndEmailController } from "./controllers/GetUserByNameAndEmailController";
import {  GetAllUsersController} from "./controllers/GetAllUsersController";

const routes = Router();

routes.post(
  "/users",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(3),
      email: Joi.string().required(),
      birthDate: Joi.date().max("01-01-2015").iso().messages({
        "date.format": `Date format is YYYY-MM-DD`,
      }),
      userName: Joi.string().required().min(5),
    }),
  }),
  new CreateUserController().handle
);

routes.get("/users/:id", new GetUserByIdController().handle);
routes.put("/users/update/:id", new UpdateUserController().handle);
routes.delete("/users/delete/:id", new DeleteUserController().handle);
routes.get("/users", new GetUserByNameAndEmailController().handle);
routes.get("/user", new GetAllUsersController().handle);

export { routes };
