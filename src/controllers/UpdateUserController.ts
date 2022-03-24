import { container } from "tsyringe";
import { UpdateUserUseCaseOriginal } from "../usecases/UpdateUserUseCaseOriginal";
import { Controller } from "../Classes/Controller";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { IFindByIdDTO } from "../dtos/IFindByIdDTO";

class UpdateUserController extends Controller {
  async exec(params: IFindByIdDTO, payload: IUpdateUserDTO) {
    const updateUserUseCaseOriginal = container.resolve(
      UpdateUserUseCaseOriginal
    );
    const updatedUser = await updateUserUseCaseOriginal.execute({
      ...params,
      ...payload,
    });

    return updatedUser;
  }
}

export { UpdateUserController };
