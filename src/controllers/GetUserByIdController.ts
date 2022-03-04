import { Request, Response } from "express";
import { GetUserByIdUseCase } from "../usecases/GetUserByIdUseCase";

class GetUserByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const userbyid = new GetUserByIdUseCase();

    const result = await userbyid.execute({ id });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }
    return response.json(result);
  }
}

export { GetUserByIdController };
