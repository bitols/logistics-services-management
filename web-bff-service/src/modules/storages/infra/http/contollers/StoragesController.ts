import GetStoragesUseCase from '@modules/storages/useCases/GetStoragesUseCase';
import GetSuppliersUseCase from '@modules/suppliers/useCases/GetSuppliersUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateStoragesUseCase from '@modules/storages/useCases/CreateStoragesUseCase';
import AppErrors from '@shared/errors/AppErrors';
import GetProductsBySenderUseCase from '@modules/products/useCases/GetProductsBySenderUseCase';
import GetStoredProductsUseCase from '@modules/storages/useCases/GetStoredProductsUseCase';
import AddStoragesProductsUseCase from '@modules/storages/useCases/AddStoragesProductsUseCase';
import RmvStoragesproductsUseCase from '@modules/storages/useCases/RmvStoragesProductsUseCase';
import DeleteStoragesUseCase from '@modules/storages/useCases/DeleteStoragesUseCase';
import GetStoragesReportUseCase from '@modules/reports/useCases/GetStoragesReportUseCase';

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
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteStorage = container.resolve(DeleteStoragesUseCase);
    await deleteStorage.execute({ id });
    return response.json({});
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const scope = '[StoragesController]';
    const method = '[create]';
    const { name, capacity, email, phone, address, supplierId, senderId } =
      request.body;

    try {
      console.time(`[INFO]${scope}${method} Total execution`);

      console.log(`[INFO]${scope}${method} storage: ${name}`);

      const getSuppliers = container.resolve(GetSuppliersUseCase);
      const createStorage = container.resolve(CreateStoragesUseCase);

      if (request.credential.senderId !== senderId) {
        throw new AppErrors('Unauthorized', 401);
      }

      const supplier = await getSuppliers.execute({ id: supplierId });
      if (!supplier) {
        throw new AppErrors('Data integrity violation', 400);
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

      console.time(`[INFO]${scope}${method} Mount response`);
      const responseJson = response.json({
        id: storage.id,
      });
      console.timeEnd(`[INFO]${scope}${method} Mount response`);

      console.timeEnd(`[INFO]${scope}${method} Total execution`);
      return responseJson;
    } catch (err: any) {
      console.error(`[ERR]${scope}${method} ${err.message}`);
      console.timeEnd(`[INFO]${scope}${method} Total execution`);
      throw err;
    }
  }

  public async getStoredProducts(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const getProducts = container.resolve(GetProductsBySenderUseCase);
    const getStoredProducts = container.resolve(GetStoredProductsUseCase);
    const getStorages = container.resolve(GetStoragesUseCase);

    const storage = await getStorages.execute({ id });
    if (!storage) {
      throw new AppErrors('Data integrity violation', 422);
    }

    if (request.credential.senderId !== storage.senderId) {
      throw new AppErrors('Unauthorized', 401);
    }
    const products = await getProducts.execute({ senderId: storage.senderId });
    const storedProducts = await getStoredProducts.execute({ id: storage.id });

    return response.json(
      products
        .map(product => {
          return {
            id: product.id,
            name: product.name,
            quantity: storedProducts.filter(
              storedProducts => storedProducts.productId === product.id,
            ).length,
            value: product.price,
          };
        })
        .filter(product => product.quantity > 0),
    );
  }

  public async getStoragesReport(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const scope = '[StoragesController]';
    const method = '[getStoragesReport]';
    try {
      console.time(`[INFO]${scope}${method} Total execution`);

      const { id } = request.params;
      console.log(`[INFO]${scope}${method} storageId:${id}`);

      const getStorages = container.resolve(GetStoragesUseCase);
      const getReports = container.resolve(GetStoragesReportUseCase);

      const storage = await getStorages.execute({ id });

      if (request.credential.senderId !== storage.senderId) {
        throw new AppErrors('Unauthorized', 401);
      }

      const reports = await getReports.execute({
        storageId: id,
      });

      console.time(`[INFO]${scope}${method} Mount response`);
      const responseJson = response.json(reports);
      console.timeEnd(`[INFO]${scope}${method} Mount response`);

      console.timeEnd(`[INFO]${scope}${method} Total execution`);

      return responseJson;
    } catch (err: any) {
      console.error(`[ERR]${scope}${method} ${err.message}`);
      console.timeEnd(`[INFO]${scope}${method} Total execution`);
      throw err;
    }
  }

  public async addStoredProducts(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const scope = '[StoragesController]';
    const method = '[addStoredProducts]';
    const { id: storageId } = request.params;
    const { productId, quantity } = request.body;
    try {
      const getStorages = container.resolve(GetStoragesUseCase);
      const createStoredProducts = container.resolve(
        AddStoragesProductsUseCase,
      );
      console.time(`[INFO]${scope}${method} Total execution`);

      console.log(
        `[INFO]${scope}${method} storageId: ${storageId}, productId: ${productId}, quantity: ${quantity}`,
      );

      const storage = await getStorages.execute({ id: storageId });
      if (!storage) {
        throw new AppErrors('Data integrity violation', 422);
      }

      if (request.credential.senderId !== storage.senderId) {
        throw new AppErrors('Unauthorized', 401);
      }

      await createStoredProducts.execute({
        storageId,
        productId,
        quantity,
      });

      console.timeEnd(`[INFO]${scope}${method} Total execution`);
      return response.json({});
    } catch (err: any) {
      console.error(`[ERR]${scope}${method} ${err.message}`);
      console.timeEnd(`[INFO]${scope}${method} Total execution`);
      throw err;
    }
  }

  public async removeStoredProducts(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id: storageId, productId } = request.params;
    const { quantity } = request.body;

    const getStorages = container.resolve(GetStoragesUseCase);
    const rmvStoredProduct = container.resolve(RmvStoragesproductsUseCase);

    const storage = await getStorages.execute({ id: storageId });
    if (!storage) {
      throw new AppErrors('Data integrity violation', 422);
    }

    if (request.credential.senderId !== storage.senderId) {
      throw new AppErrors('Unauthorized', 401);
    }

    await rmvStoredProduct.execute({
      storageId,
      productId,
      quantity,
    });

    return response.json({});
  }
}
