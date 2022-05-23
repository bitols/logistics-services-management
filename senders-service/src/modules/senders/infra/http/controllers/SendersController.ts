import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SuppliersController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    return response.json([]);
  }

  public async getById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    return response.json({});
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, phone } = request.body;

    return response.json({});
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, phone } = request.body;

    return response.json({});
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    return response.json({});
  }
}
