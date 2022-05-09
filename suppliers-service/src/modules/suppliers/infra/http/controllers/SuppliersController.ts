import CreateSuppliersUseCase from '@modules/suppliers/useCases/CreateSuppliersUseCase';
import DeleteSuppliersUseCase from '@modules/suppliers/useCases/DeleteSuppliersUseCase';
import GetAllSuppliersUseCase from '@modules/suppliers/useCases/GetAllSuppliersUseCase';
import GetSuppliersUseCase from '@modules/suppliers/useCases/GetSuppliersUseCase';
import UpdateSuppliersUseCase from '@modules/suppliers/useCases/UpdateSuppliersUseCase';

import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SuppliersController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const getAllSuppliers = container.resolve(GetAllSuppliersUseCase);
    const suppliers = await getAllSuppliers.execute();

    return response.json(suppliers);
  }

  public async getById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const getSuppliers = container.resolve(GetSuppliersUseCase);
    const supplier = await getSuppliers.execute({ id });

    return response.json(supplier);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, phone } = request.body;

    const createSupplier = container.resolve(CreateSuppliersUseCase);
    const supplier = await createSupplier.execute({ name, email, phone });

    return response.json(supplier);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, phone } = request.body;

    const updateSupplier = container.resolve(UpdateSuppliersUseCase);
    const supplier = await updateSupplier.execute({
      id,
      name,
      email,
      phone,
    });

    return response.json(supplier);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteSupplier = container.resolve(DeleteSuppliersUseCase);
    await deleteSupplier.execute({ id });

    return response.json({});
  }
}
