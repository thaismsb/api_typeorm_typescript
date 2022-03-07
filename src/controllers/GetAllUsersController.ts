import { Request, Response } from "express";
import { GetAllUsersUseCase } from "../usecases/getAllUsersUseCase";

class GetAllUsersController{
  async handle(request: Request, response: Response) {
    const getall = new GetAllUsersUseCase();

    const result = await getall.execute();

    return response.json(result);
  }
}

export { GetAllUsersController };
