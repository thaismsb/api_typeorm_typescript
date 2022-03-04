import { Request, Response } from "express";
import {UpdateUserUseCaseOriginal} from "../usecases/UpdateUserUseCaseOriginal"

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { name, email, birthDate, userName } = request.body;

    const updateuser = new UpdateUserUseCaseOriginal();

    const result = await updateuser.execute({
      id,
      name,
      email,
      birthDate,
      userName,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }
    return response.json(result);
  }
}

export { UpdateUserController };
