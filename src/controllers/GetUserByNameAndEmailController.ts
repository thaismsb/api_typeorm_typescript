import { container } from "tsyringe";
import { GetUserByNameAndEmailUseCase } from "../usecases/GetUserByNameAndEmailUseCase";
import { Controller } from "../Classes/Controller";
import { IFindByNameAndEmailDTO } from "~/dtos/IFindByNameAndEmailDTO";

class GetUserByNameAndEmailController extends Controller {
  async exec(payload: IFindByNameAndEmailDTO) {
    const name = payload;

    const getUserByNameAndEmailUseCase = container.resolve(
      GetUserByNameAndEmailUseCase
    );
    return getUserByNameAndEmailUseCase.execute(name);
  }
}

export { GetUserByNameAndEmailController };
