import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetSuppliers } from '../domain/models/requests/IGetSuppliers';
import { ISuppliers } from '../domain/models/responses/ISuppliers';
import { ISuppliersRepository } from '../domain/repositories/ISuppliersRepository';
@injectable()
export default class GetSuppliersUseCase {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,
  ) {}

  public async execute(data: IGetSuppliers): Promise<ISuppliers> {
    const supplier = await this.suppliersRepository.getById(data.id);
    if (!supplier) {
      throw new AppErrors('Supplier not found');
    }

    return {
      id: supplier.id,
      email: supplier.email,
      name: supplier.name,
      phone: supplier.phone,
    };
  }
}
