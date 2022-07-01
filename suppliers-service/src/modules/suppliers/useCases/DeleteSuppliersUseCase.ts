import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IDeleteSuppliers } from '../domain/models/requests/IDeleteSuppliers';
import { ISuppliersRepository } from '../domain/repositories/ISuppliersRepository';

@injectable()
export default class DeleteSuppliersUseCase {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,
  ) {}

  public async execute(data: IDeleteSuppliers): Promise<void> {
    const supplier = await this.suppliersRepository.getById(data.id);

    if (!supplier) {
      throw new AppErrors('Supplier not found');
    }

    await this.suppliersRepository.remove(supplier);
  }
}
