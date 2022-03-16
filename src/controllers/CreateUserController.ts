import { container } from "tsyringe";
import { CreateUserUseCase } from "../usecases/CreateUserUseCase";
import { Controller } from "../Classes/Controller";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

class CreateUserController extends Controller {
  async exec(payload: ICreateUserDTO) {
    const createUserUseCase = container.resolve(CreateUserUseCase);

    return createUserUseCase.execute(payload);
  }
}

export { CreateUserController };
