import { CreateProductsUseCase } from '@modules/registrationsManagement/useCases/CreateProductsUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, height, width, lenght, price, senderId, storageId } =
      request.body;

    const createProduct = container.resolve(CreateProductsUseCase);
    const product = await createProduct.execute({
      name,
      height,
      width,
      lenght,
      price,
      senderId,
      storageId,
    });

    return response.json(product);
  }
}
