import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { GetUserByIdController } from "./controllers/GetUserByIdController";
import { celebrate, Joi, Segments } from "celebrate";
import { UpdateUserController } from "./controllers/UpdateUserController";
import { DeleteUserController } from "./controllers/DeleteUserController";
import { GetAllUsersController } from "./controllers/GetAllUsersController";
import { GetUserByNameAndEmailController } from "./controllers/GetUserByNameAndEmailController";

const routes = Router();
const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const getAllUsersController = new GetAllUsersController();
const getUserByIdController = new GetUserByIdController();
const getUserByNameAndEmailController = new GetUserByNameAndEmailController();
const updateUserController = new UpdateUserController();

routes.post(
  "/users",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(3).required(),
      email: Joi.string()
        .pattern(new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/))
        .messages({
          "string.pattern.base": "Invalid email",
        })
        .required(),
      // .error(new Error("email inválido")),
      birthDate: Joi.date().max("01-01-2015").iso().messages({
        "date.format": `Date format is YYYY-MM-DD`,
      }),
      userName: Joi.string().min(5).required(),
    }),
  }),
  createUserController.handleBody.bind(createUserController)
);

routes.get(
  "/users/:id",
  getUserByIdController.handleRouteParams.bind(getUserByIdController)
);

routes.put(
  "/users/update/:id",
  updateUserController.handleParamsBody.bind(updateUserController)
);

routes.delete(
  "/users/delete/:id",
  deleteUserController.handleRouteParams.bind(deleteUserController)
);

routes.get(
  "/users",
  getUserByNameAndEmailController.handleQuery.bind(
    getUserByNameAndEmailController
  )
);

routes.get(
  "/user",
  getAllUsersController.handleBody.bind(getAllUsersController)
);

export { routes };
