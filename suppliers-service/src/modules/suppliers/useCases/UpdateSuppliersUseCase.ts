import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IUpdateSuppliers } from '../domain/models/requests/IUpdateSuppliers';
import { ISuppliers } from '../domain/models/responses/ISuppliers';
import { ISuppliersRepository } from '../domain/repositories/ISuppliersRepository';

@injectable()
export default class UpdateSuppliersUseCase {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,
  ) {}

  public async execute(data: IUpdateSuppliers): Promise<ISuppliers> {
    const supplier = await this.suppliersRepository.getById(data.id);

    if (!supplier) {
      throw new AppErrors('Supplier not found');
    }

    supplier.name = data.name;
    supplier.email = data.email;
    supplier.phone = data.phone;

    await this.suppliersRepository.save(supplier);

    return {
      id: supplier.id,
      email: supplier.email,
      name: supplier.name,
      phone: supplier.phone,
    };
  }
}
