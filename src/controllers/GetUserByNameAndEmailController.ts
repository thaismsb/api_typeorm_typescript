import { Request, Response } from "express";
import { GetUserByNameAndEmailUseCase } from "../usecases/GetUserByNameAndEmailUseCase";

class GetUserByNameAndEmailController{
  async handle(request: Request, response: Response) {
    const { query } = request.query;

    const userbynameandemail = new GetUserByNameAndEmailUseCase();

    const result = await userbynameandemail.execute({});

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }
    return response.json(result);
  }

    
  }


export { GetUserByNameAndEmailController };