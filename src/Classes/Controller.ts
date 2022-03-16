import { Request, Response } from "express";

abstract class Controller {
  abstract exec(...args: unknown[]): Promise<unknown>;

  protected statusCode: number;

  constructor() {
    this.statusCode = 200;
  }

  async handleBody(req: Request, res: Response): Promise<Response> {
    const result = await this.exec(req.body);

    return res.status(this.statusCode).json(result);
  }

  async handleParams(req: Request, res: Response): Promise<Response> {
    const param = req.params[Object.keys(req.params)[0]];
    const result = await this.exec(param);

    return res.status(this.statusCode).json(result);
  }

  async handleRouteParams(req: Request, res: Response): Promise<Response> {
    const result = await this.exec(req.params);

    return res.status(this.statusCode).json(result);
  }

  async handleQuery(req: Request, res: Response): Promise<Response> {
    const result = await this.exec(req.query);

    return res.status(this.statusCode).json(result);
  }

  // async handleSingleFile(req: Request, res: Response): Promise<Response> {
  //   const result = await this.exec({
  //     file: req.file,
  //     body: req.body,
  //   });
  //   return res.status(this.statusCode).json(result);
  // }

  //
  async handleParamsBody(req: Request, res: Response): Promise<Response> {
    const result = await this.exec(req.params, req.body);

    return res.status(this.statusCode).json(result);
  }

  async handleParamsQueryBody(req: Request, res: Response): Promise<Response> {
    const result = await this.exec(req.params, req.query, req.body);

    return res.status(this.statusCode).json(result);
  }
}

export { Controller };
