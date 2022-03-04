import { Request, Response } from "express";
import { DeleteUserUseCase } from "../usecases/DeleteUserUseCase";

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteuser = new DeleteUserUseCase();

    const result = await deleteuser.execute({ id });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }
    return response.status(204).end();
  }
}

export { DeleteUserController };
