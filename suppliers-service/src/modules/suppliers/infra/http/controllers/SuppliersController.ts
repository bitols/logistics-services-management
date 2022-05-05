import GetAllSuppliersUseCase from '@modules/suppliers/useCases/GetAllSuppliersUseCase';
import GetSuppliersUseCase from '@modules/suppliers/useCases/GetSuppliersUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SuppliersController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const getAllSuppliers = container.resolve(GetAllSuppliersUseCase);
    const suppliers = getAllSuppliers.execute();

    return response.json(suppliers);
  }

  public async getById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const getSuppliers = container.resolve(GetSuppliersUseCase);
    const supplier = getSuppliers.execute({ id });

    return response.json(supplier);
  }
}
