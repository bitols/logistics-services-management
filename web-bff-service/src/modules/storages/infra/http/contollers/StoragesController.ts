import GetProductsByStorageUseCase from '@modules/products/useCases/GetProductsByStorageUseCase';
import GetStoragesUseCase from '@modules/storages/useCases/GetStoragesUseCase';
import GetSendersUseCase from '@modules/senders/useCases/GetSendersUseCase';
import GetSuppliersUseCase from '@modules/suppliers/useCases/GetSuppliersUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateStoragesUseCase from '@modules/storages/useCases/CreateStoragesUseCase';
import AppErrors from '@shared/errors/AppErrors';
import GetStoragesBySenderUsecase from '@modules/storages/useCases/GetStoragesBySenderUseCase';

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

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, capacity, email, phone, address, supplierId, senderId } =
      request.body;

    const getSuppliers = container.resolve(GetSuppliersUseCase);
    const getSender = container.resolve(GetSendersUseCase);
    const createStorage = container.resolve(CreateStoragesUseCase);
    const getStoragesBySender = container.resolve(GetStoragesBySenderUsecase);

    const sender = await getSender.execute({ id: senderId });
    if (sender.id !== senderId) {
      throw new AppErrors('Data integrity violation');
    }

    const supplier = await getSuppliers.execute({ id: supplierId });
    if (!supplier) {
      throw new AppErrors('Data integrity violation');
    }

    const storages = await getStoragesBySender.execute({ senderId });
    const filterStorages = storages.filter(storage => storage.name === name);
    if (filterStorages.length) {
      throw new AppErrors('Storage already exists');
    }

    const storage = await createStorage.execute({
      name,
      capacity,
      email,
      phone,
      address,
      supplierId,
      senderId,
    });

    return response.json({
      id: storage.id,
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
