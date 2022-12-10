import CreateSuppliersUseCase from '@modules/suppliers/useCases/CreateSuppliersUseCase';
import DeleteSuppliersUseCase from '@modules/suppliers/useCases/DeleteSuppliersUseCase';
import GetAllSuppliersUseCase from '@modules/suppliers/useCases/GetAllSuppliersUseCase';
import GetSuppliersUseCase from '@modules/suppliers/useCases/GetSuppliersUseCase';
import UpdateSuppliersUseCase from '@modules/suppliers/useCases/UpdateSuppliersUseCase';

import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SuppliersController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const scope = '[SuppliersController]';
    const method = '[getAll]';
    try {
      console.time(`[INFO]${scope}${method} Total execution`);
      const getAllSuppliers = container.resolve(GetAllSuppliersUseCase);
      console.log(`[INFO]${scope}${method}}`);
      const suppliers = await getAllSuppliers.execute();

      console.time(`[INFO]${scope}${method} Mount response`);
      const responseJson = response.json(suppliers);
      console.timeEnd(`[INFO]${scope}${method} Mount response`);

      console.timeEnd(`[INFO]${scope}${method} Total execution`);
      return responseJson;
    } catch (err: any) {
      console.error(`[ERR]${scope}${method} ${err.message}`);
      console.timeEnd(`[INFO]${scope}${method} Total execution`);
      throw err;
    }
  }

  public async getById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const scope = '[SuppliersController]';
    const method = '[getById]';

    try {
      console.time(`[INFO]${scope}${method} Total execution`);

      console.log(`[INFO]${scope}${method}  id:${id}`);
      const getSuppliers = container.resolve(GetSuppliersUseCase);
      const supplier = await getSuppliers.execute({ id });

      console.time(`[INFO]${scope}${method} Mount response`);
      const responseJson = response.json(supplier);
      console.timeEnd(`[INFO]${scope}${method} Mount response`);

      console.time(`[INFO]${scope}${method} Total execution`);
      return responseJson;
    } catch (err: any) {
      console.error(`[ERR]${scope}${method} ${err.message}`);
      console.timeEnd(`[INFO]${scope}${method} Total execution`);
      throw err;
    }
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
