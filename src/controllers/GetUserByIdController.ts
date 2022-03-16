import { container } from "tsyringe";
import { GetUserByIdUseCase } from "~/usecases/GetUserByIdUseCase";
import { Controller } from "../Classes/Controller";
import { IFindByIdDTO } from "../dtos/IFindByIdDTO";

class GetUserByIdController extends Controller {
  async exec(payload: IFindByIdDTO) {
    const { id } = payload;

    const getUserByIdUseCase = container.resolve(GetUserByIdUseCase);

    return getUserByIdUseCase.execute(id);
  }
}

export { GetUserByIdController };
