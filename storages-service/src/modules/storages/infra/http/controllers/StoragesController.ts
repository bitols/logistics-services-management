import CreateStoragesProductsUseCase from '@modules/storages/useCases/CreateStoragesProductsUseCase';
import CreateStoragesUseCase from '@modules/storages/useCases/CreateStoragesUseCase';
import DeleteStoragesProductsUseCase from '@modules/storages/useCases/DeleteStoragesProductsUseCase';
import DeleteStoragesUseCase from '@modules/storages/useCases/DeleteStoragesUseCase';
import GetAllStoragesByNameUsecase from '@modules/storages/useCases/GetAllStoragesByNameUseCase';
import GetAllStoragesBySenderIdUseCase from '@modules/storages/useCases/GetAllStoragesBySenderIdUseCase';
import GetAllStoragesBySupplierIdUseCase from '@modules/storages/useCases/GetAllStoragesBySupplierIdUseCase';
import GetAllStoragesProductsUseCase from '@modules/storages/useCases/GetAllStoragesProductsUseCase';
import GetStoragesUseCase from '@modules/storages/useCases/GetStoragesUseCase';
import { UpdateLocationUseCase } from '@modules/storages/useCases/UpdateLocationUseCase';
import UpdateStoragesUseCase from '@modules/storages/useCases/UpdateStoragesUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class StoragesController {
  public async getById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const scope = '[StoragesController]';
    const method = '[getById]';
    const { id } = request.params;
    try {
      console.time(`[INFO]${scope}${method} Total execution`);

      console.log(`[INFO]${scope}${method}  id:${id}`);
      const getStorage = container.resolve(GetStoragesUseCase);
      const storage = await getStorage.execute({ id });

      console.time(`[INFO]${scope}${method} Mount response`);
      const responseJson = response.json(storage);
      console.timeEnd(`[INFO]${scope}${method} Mount response`);

      console.timeEnd(`[INFO]${scope}${method} Total execution`);
      return responseJson;
    } catch (err: any) {
      console.error(`[ERR]${scope}${method} ${err.message}`);
      console.timeEnd(`[INFO]${scope}${method} Total execution`);
      throw err;
    }
  }

  public async getAllBySupplierId(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const getAllStoragesBySupplier = container.resolve(
      GetAllStoragesBySupplierIdUseCase,
    );
    const storages = await getAllStoragesBySupplier.execute({ supplierId: id });

    return response.json(storages);
  }

  public async getAllBySenderId(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const scope = '[StoragesController]';
    const method = '[getAllBySenderId]';
    const { id } = request.params;
    const name = request.query.name as string;
    try {
      console.time(`[INFO]${scope}${method} Total execution`);

      console.log(`[INFO]${scope}${method}  senderId:${id}`);
      if (name) {
        const getAllStoragesByName = container.resolve(
          GetAllStoragesByNameUsecase,
        );

        const storages = await getAllStoragesByName.execute({
          senderId: id,
          name: name,
        });
        return response.json(storages);
      }
      const getAllStoragesBySender = container.resolve(
        GetAllStoragesBySenderIdUseCase,
      );

      const storages = await getAllStoragesBySender.execute({ senderId: id });

      console.time(`[INFO]${scope}${method} Mount response`);
      const responseJson = response.json(storages);
      console.timeEnd(`[INFO]${scope}${method} Mount response`);

      console.timeEnd(`[INFO]${scope}${method} Total execution`);

      return responseJson;
    } catch (err: any) {
      console.error(`[ERR]${scope}${method} ${err.message}`);
      console.timeEnd(`[INFO]${scope}${method} Total execution`);
      throw err;
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, capacity, email, phone, address, supplierId, senderId } =
      request.body;

    const createStorage = container.resolve(CreateStoragesUseCase);
    const storage = await createStorage.execute({
      name,
      capacity,
      email,
      phone,
      address,
      supplierId,
      senderId,
    });

    return response.json(storage);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, capacity, email, phone, address } = request.body;

    const updateStorage = container.resolve(UpdateStoragesUseCase);
    const storage = await updateStorage.execute({
      id,
      name,
      capacity,
      email,
      phone,
      address,
    });

    return response.json(storage);
  }

  public async updateLocation(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const { location } = request.body;

    const updateLocation = container.resolve(UpdateLocationUseCase);
    const storage = await updateLocation.execute({
      id,
      location,
    });

    return response.json(storage);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteStorage = container.resolve(DeleteStoragesUseCase);
    await deleteStorage.execute({ id });

    return response.json({});
  }

  public async getStoredProducts(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const getAllStoredProducts = container.resolve(
      GetAllStoragesProductsUseCase,
    );

    const storageProducts = await getAllStoredProducts.execute({ id });
    return response.json(storageProducts);
  }

  public async addStoreProduct(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      name,
      height,
      width,
      lenght,
      value,
      productId,
      storageId,
      quantity,
    } = request.body;

    const createStoredProducts = container.resolve(
      CreateStoragesProductsUseCase,
    );

    const storageProducts = await createStoredProducts.execute({
      name,
      height,
      width,
      lenght,
      value,
      productId,
      storageId,
      quantity,
    });
    return response.json(storageProducts);
  }

  public async removeStoreProduct(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const deleteProduct = container.resolve(DeleteStoragesProductsUseCase);
    await deleteProduct.execute(request.body);

    return response.json({});
  }
}
