import CreateStoragesUseCase from '@modules/storages/useCases/CreateStoragesUseCase';
import DeleteStoragesUseCase from '@modules/storages/useCases/DeleteStoragesUseCase';
import GetAllStoragesBySupplierIdUseCase from '@modules/storages/useCases/GetAllStoragesBySupplierIdUseCase';
import GetStoragesUseCase from '@modules/storages/useCases/GetStoragesUseCase';
import UpdateStoragesUseCase from '@modules/storages/useCases/UpdateStoragesUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class StoragesController {
  public async getById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const getStorage = container.resolve(GetStoragesUseCase);
    const storage = await getStorage.execute({ id });

    return response.json(storage);
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

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, phone, address, supplierId } = request.body;

    const createStorage = container.resolve(CreateStoragesUseCase);
    const storage = await createStorage.execute({
      name,
      email,
      phone,
      address,
      supplierId,
    });

    return response.json(storage);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, phone, address, supplierId } = request.body;

    const updateStorage = container.resolve(UpdateStoragesUseCase);
    const storage = await updateStorage.execute({
      id,
      name,
      email,
      phone,
      address,
      supplierId,
    });

    return response.json(storage);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteStorage = container.resolve(DeleteStoragesUseCase);
    await deleteStorage.execute({ id });

    return response.json({});
  }
}
