import GetStoragesUseCase from '@modules/storages/useCases/GetStoragesUseCase';
import GetSendersUseCase from '@modules/senders/useCases/GetSendersUseCase';
import GetSuppliersUseCase from '@modules/suppliers/useCases/GetSuppliersUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateStoragesUseCase from '@modules/storages/useCases/CreateStoragesUseCase';
import AppErrors from '@shared/errors/AppErrors';
import GetStoragesBySenderUsecase from '@modules/storages/useCases/GetStoragesBySenderUseCase';
import GetStoredProductsUseCase from '@modules/storages/useCases/GetStoredProductsUseCase';
import CreateStoragesProductsUseCase from '@modules/storages/useCases/CreateStoragesProductsUseCase';
import DeleteStoragesproductsUseCase from '@modules/storages/useCases/DeleteStoragesProductsUseCase';

export default class StoragesController {
  public async getById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const getStorages = container.resolve(GetStoragesUseCase);
    const getSuppliers = container.resolve(GetSuppliersUseCase);

    const storage = await getStorages.execute({ id });
    if (!storage) {
      throw new AppErrors('Data integrity violation', 422);
    }

    if (request.credential.senderId !== storage.senderId) {
      throw new AppErrors('Unauthorized', 401);
    }

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

    if (request.credential.senderId !== senderId) {
      throw new AppErrors('Unauthorized', 401);
    }

    const sender = await getSender.execute({ id: senderId });
    if (!sender) {
      throw new AppErrors('Data integrity violation', 422);
    }

    const supplier = await getSuppliers.execute({ id: supplierId });
    if (!supplier) {
      throw new AppErrors('Data integrity violation', 422);
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

  public async getStoredProducts(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const getProducts = container.resolve(GetStoredProductsUseCase);
    const getStorages = container.resolve(GetStoragesUseCase);
    const getSender = container.resolve(GetSendersUseCase);

    const storage = await getStorages.execute({ id });
    if (!storage) {
      throw new AppErrors('Data integrity violation', 422);
    }

    if (request.credential.senderId !== storage.senderId) {
      throw new AppErrors('Unauthorized', 401);
    }

    const sender = await getSender.execute({ id: storage.senderId });
    const products = await getProducts.execute({ id: storage.id });

    return response.json(
      products.map(product => {
        return {
          id: product.id,
          productId: product.productId,
          name: product.name,
          height: product.height,
          width: product.width,
          lenght: product.lenght,
          value: product.value,
          sender: {
            id: sender.id,
            name: sender.name,
          },
        };
      }),
    );
  }

  public async addStoredProducts(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id: storageId } = request.params;
    const { name, height, width, lenght, value, productId } = request.body;

    const getStorages = container.resolve(GetStoragesUseCase);
    const createStoredProducts = container.resolve(
      CreateStoragesProductsUseCase,
    );

    const storage = await getStorages.execute({ id: storageId });
    if (!storage) {
      throw new AppErrors('Data integrity violation', 422);
    }

    if (request.credential.senderId !== storage.senderId) {
      throw new AppErrors('Unauthorized', 401);
    }

    const storageProducts = await createStoredProducts.execute({
      name,
      height,
      width,
      lenght,
      value,
      productId,
      storageId,
    });
    return response.json({
      id: storageProducts.id,
      storageId: storageProducts.storageId,
      productId: storageProducts.productId,
    });
  }

  public async removeStoredProducts(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id: storageId } = request.params;
    const { productId } = request.params;

    const getStorages = container.resolve(GetStoragesUseCase);
    const deleteStoredProduct = container.resolve(
      DeleteStoragesproductsUseCase,
    );

    const storage = await getStorages.execute({ id: storageId });
    if (!storage) {
      throw new AppErrors('Data integrity violation', 422);
    }

    if (request.credential.senderId !== storage.senderId) {
      throw new AppErrors('Unauthorized', 401);
    }

    await deleteStoredProduct.execute({ id: productId });

    return response.json({});
  }
}
