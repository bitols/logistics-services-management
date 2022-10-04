import CreateProductsUseCase from '@modules/products/useCases/CreateProductsUseCase';
import DeleteProductsUseCase from '@modules/products/useCases/DeleteProductsUseCase';
import GetProductsUseCase from '@modules/products/useCases/GetProductsUseCase';
import GetSendersUseCase from '@modules/senders/useCases/GetSendersUseCase';
import AppErrors from '@shared/errors/AppErrors';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
export default class ProductsController {
  public async getById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const getProduct = container.resolve(GetProductsUseCase);
    const getSender = container.resolve(GetSendersUseCase);

    const product = await getProduct.execute({ id });
    const sender = await getSender.execute({ id: product.senderId });

    if (request.credential.senderId !== sender.id) {
      throw new AppErrors('Unauthorized', 401);
    }

    return response.json({
      id: product.id,
      name: product.name,
      height: product.height,
      width: product.width,
      lenght: product.lenght,
      price: product.price,
      sender: {
        id: sender.id,
        name: sender.name,
      },
    });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = container.resolve(DeleteProductsUseCase);
    await deleteProduct.execute({ id });
    return response.json({});
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, height, width, lenght, price, senderId } = request.body;

    const createProduct = container.resolve(CreateProductsUseCase);
    const getSender = container.resolve(GetSendersUseCase);

    const sender = await getSender.execute({ id: senderId });
    if (request.credential.senderId !== sender.id) {
      throw new AppErrors('Unauthorized', 401);
    }

    const product = await createProduct.execute({
      name,
      height,
      width,
      lenght,
      price,
      senderId,
    });

    return response.json({
      id: product.id,
    });
  }
}
