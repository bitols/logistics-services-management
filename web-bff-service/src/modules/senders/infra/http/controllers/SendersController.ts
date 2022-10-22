import GetSendersUseCase from '@modules/senders/useCases/GetSendersUseCase';
import GetStoragesBySenderUsecase from '@modules/storages/useCases/GetStoragesBySenderUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppErrors from '@shared/errors/AppErrors';
import GetProductsBySenderUseCase from '@modules/products/useCases/GetProductsBySenderUseCase';
import GetAllSuppliersUseCase from '@modules/suppliers/useCases/GetAllSuppliersUseCase';
export default class SendersController {
  public async getById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const getSenders = container.resolve(GetSendersUseCase);

    const sender = await getSenders.execute({ id });

    if (request.credential.senderId !== sender.id) {
      throw new AppErrors('Unauthorized', 401);
    }

    return response.json(sender);
  }

  public async getStorages(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const name = request.query.name as string;

    const getSenders = container.resolve(GetSendersUseCase);
    const sender = await getSenders.execute({ id });

    if (request.credential.senderId !== sender.id) {
      throw new AppErrors('Unauthorized', 401);
    }
    const getAllSuppliers = container.resolve(GetAllSuppliersUseCase);
    const suppliers = await getAllSuppliers.execute();

    const getStorages = container.resolve(GetStoragesBySenderUsecase);
    const storages = await getStorages.execute({ senderId: id, name });

    return response.json(
      storages.map(storage => {
        return {
          id: storage.id,
          name: storage.name,
          capacity: storage.capacity,
          email: storage.email,
          phone: storage.phone,
          address: storage.address,
          location: storage.location,
          supplier: suppliers
            .filter(supplier => supplier.id === storage.supplierId)
            .reduce(prev => {
              return prev;
            }),
        };
      }),
    );
  }

  public async getProducts(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const name = request.query.name as string;

    const getSenders = container.resolve(GetSendersUseCase);
    const sender = await getSenders.execute({ id });

    if (request.credential.senderId !== sender.id) {
      throw new AppErrors('Unauthorized', 401);
    }
    const getProducts = container.resolve(GetProductsBySenderUseCase);

    const products = await getProducts.execute({
      senderId: id,
      name,
    });

    return response.json(products);
  }
}
