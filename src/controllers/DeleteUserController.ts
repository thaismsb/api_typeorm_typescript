import { container } from "tsyringe";
import { DeleteUserUseCase } from "../usecases/DeleteUserUseCase";
import { Controller } from "../Classes/Controller";
import { IDeleteUserDTO } from "../dtos/IDeleteUserDTO";

class DeleteUserController extends Controller {
  async exec(payload: IDeleteUserDTO) {
    const { id } = payload;
    const deleteUserUseCase = container.resolve(DeleteUserUseCase);

    return deleteUserUseCase.execute(id);
  }
}

export { DeleteUserController };
