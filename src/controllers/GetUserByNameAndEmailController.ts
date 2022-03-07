import { Request, Response } from "express";
import { GetUserByNameAndEmailUseCase } from "../usecases/GetUserByNameAndEmailUseCase";

class GetUserByNameAndEmailController {
  async handle(request: Request, response: Response) {
    const name = request.query.name as unknown as string

    const userbynameandemail = new GetUserByNameAndEmailUseCase();

    const result = await userbynameandemail.execute({name});

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }
    return response.json(result);
  }
}

export { GetUserByNameAndEmailController };
