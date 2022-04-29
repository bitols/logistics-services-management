import CreateProductUseCase from '@modules/products/useCases/CreateProductUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
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
    const {
      name,
      height,
      width,
      lenght,
      price,
      clientId,
      depotId
    } = request.body;

    const createProduct = container.resolve(CreateProductUseCase);

    const product = await createProduct.execute({
      name,
      height,
      width,
      lenght,
      price,
      clientId,
      depotId
    });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    return response.json({ update: 'ok' });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    return response.json({ delete: 'ok' });
  }
}
