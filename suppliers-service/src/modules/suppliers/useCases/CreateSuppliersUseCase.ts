import { inject, injectable } from 'tsyringe';
import { ICreateSuppliers } from '../domain/models/requests/ICreateSuppliers';
import { ISuppliers } from '../domain/models/responses/ISuppliers';
import { ISuppliersRepository } from '../domain/repositories/ISuppliersRepository';

@injectable()
export default class CreateSuppliersUseCase {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,
  ) {}

  public async execute(data: ICreateSuppliers): Promise<ISuppliers> {
    const supplier = await this.suppliersRepository.create(data);

    await this.suppliersRepository.save(supplier);

    return {
      id: supplier.id,
      email: supplier.email,
      name: supplier.name,
      phone: supplier.phone,
    };
  }
}
