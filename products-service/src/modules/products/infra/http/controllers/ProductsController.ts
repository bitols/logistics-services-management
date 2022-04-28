import { Request, Response } from 'express';

export default class ProductsController {
  public async getById(request: Request, response: Response): Promise<Response> {
    return response.json({ getById: 'ok' });
  }

  public async getAllByDepotId(request: Request, response: Response): Promise<Response> {
    return response.json([{ getAllByDepotId: 'ok' }]);
  }

  public async getAllByClientId(request: Request, response: Response): Promise<Response> {
    return response.json([{ getAllByClientId: 'ok' }]);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    return response.json({ create: 'ok' });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    return response.json({ update: 'ok' });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    return response.json({ delete: 'ok' });
  }
}
