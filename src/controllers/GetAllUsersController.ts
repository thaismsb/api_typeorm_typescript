import { container } from "tsyringe";
import { GetAllUsersUseCase } from "../usecases/GetAllUsersUseCase";
import { Controller } from "../Classes/Controller";

class GetAllUsersController extends Controller {
  async exec() {
    const getAllUsersUseCase = container.resolve(GetAllUsersUseCase);

    return getAllUsersUseCase.execute();
  }
}
export { GetAllUsersController };
