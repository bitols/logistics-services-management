import GetAllSuppliersUseCase from '@modules/suppliers/useCases/GetAllSuppliersUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SuppliersController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const getAllSuppliers = container.resolve(GetAllSuppliersUseCase);
    const suppliers = await getAllSuppliers.execute();

    return response.json(suppliers);
  }
}
