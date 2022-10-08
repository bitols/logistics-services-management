import GetAllSuppliersUseCase from '@modules/suppliers/useCases/GetAllSuppliersUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SuppliersController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const name = request.query.name as string;

    const getAllSuppliers = container.resolve(GetAllSuppliersUseCase);
    const suppliers = await getAllSuppliers.execute(name);

    return response.json(suppliers);
  }
}
