import CreateProductsUseCase from '@modules/products/useCases/CreateProductsUseCase';
import GetProductsUseCase from '@modules/products/useCases/GetProductsUseCase';
import GetSendersUseCase from '@modules/senders/useCases/GetSendersUseCase';
import GetStoragesUseCase from '@modules/storages/useCases/GetStoragesUseCase';
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
    const getStorage = container.resolve(GetStoragesUseCase);

    const product = await getProduct.execute({ id });
    const sender = await getSender.execute({ id: product.senderId });
    const storage = await getStorage.execute({ id: product.storageId });

    return response.json({
      id: product.id,
      name: product.name,
      height: product.height,
      width: product.width,
      lenght: product.lenght,
      price: product.price,
      storage: {
        id: storage.id,
        name: storage.name,
        address: storage.address,
        location: storage.location,
      },
      sender: {
        id: sender.id,
        name: sender.name,
      },
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, height, width, lenght, price, senderId, storageId } =
      request.body;

    const createProduct = container.resolve(CreateProductsUseCase);
    const getSender = container.resolve(GetSendersUseCase);
    const getStorage = container.resolve(GetStoragesUseCase);

    const sender = await getSender.execute({ id: senderId });
    const storage = await getStorage.execute({ id: storageId });

    if (sender.id !== storage.senderId) {
      throw new AppErrors('Data integrity violation');
    }
    const product = await createProduct.execute({
      name,
      height,
      width,
      lenght,
      price,
      senderId,
      storageId,
    });

    return response.json({
      id: product.id,
    });
  }
}
