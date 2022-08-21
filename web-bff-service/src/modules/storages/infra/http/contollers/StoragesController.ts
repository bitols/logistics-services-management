import GetProductsByStorageUseCase from '@modules/products/useCases/GetProductsByStorageUseCase';
import GetStoragesUseCase from '@modules/storages/useCases/GetStoragesUseCase';
import GetSendersUseCase from '@modules/senders/useCases/GetSendersUseCase';
import GetSuppliersUseCase from '@modules/suppliers/useCases/GetSuppliersUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class StoragesController {
  public async getById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const getStorages = container.resolve(GetStoragesUseCase);
    const getSuppliers = container.resolve(GetSuppliersUseCase);

    const storage = await getStorages.execute({ id });
    const supplier = await getSuppliers.execute({ id: storage.supplierId });

    return response.json({
      id: storage.id,
      name: storage.name,
      email: storage.email,
      phone: storage.phone,
      address: storage.address,
      location: storage.location,
      supplier: {
        id: supplier.id,
        name: supplier.name,
      },
    });
  }

  public async getProducts(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const getProducts = container.resolve(GetProductsByStorageUseCase);
    const getSenders = container.resolve(GetSendersUseCase);
    const getStorages = container.resolve(GetStoragesUseCase);

    const storage = await getStorages.execute({ id });
    const sender = await getSenders.execute({ id: storage.senderId });
    const products = await getProducts.execute({ storageId: storage.id });

    return response.json(
      products.map(product => {
        return {
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
        };
      }),
    );
  }
}
