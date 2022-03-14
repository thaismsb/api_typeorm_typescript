// import { Request, Response } from "express";
import { CreateUserUseCase } from "../usecases/CreateUserUseCase";

// class CreateUserController {
//   async handle(request: Request, response: Response) {
//     const { name, email, birthDate, userName } = request.body;

//     const usecase = new CreateUserUseCase();

//     const result = await usecase.execute({ name, email, birthDate, userName });

//     if (result instanceof Error) {
//       return response.status(400).json(result.message);
//     }
//     return response.json(result);
//   }
// }

// export { CreateUserController };

import { container } from "tsyringe";

import { Controller } from "../Classes/Controller";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

class CreateUserController extends Controller {
  async exec(payload: ICreateUserDTO) {
    const createUserUseCase = container.resolve(CreateUserUseCase);

    return await createUserUseCase.execute(payload);
  }
}

export { CreateUserController };

//controller/container/
