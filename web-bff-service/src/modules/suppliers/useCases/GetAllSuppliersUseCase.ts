import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { ISuppliers } from '../domain/models/responses/ISuppliers';
import { ISuppliersRepository } from '../domain/repositories/ISuppliersRepository';
@injectable()
export default class GetAllSuppliersUseCase {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,
  ) {}

  public async execute(name?: string): Promise<ISuppliers[]> {
    let suppliers: ISuppliers[] | undefined;
    suppliers = await this.suppliersRepository.getAll();
    if (!suppliers) {
      throw new AppErrors('Suppliers not found');
    }

    if (name) {
      suppliers = suppliers.filter(supplier => supplier.name.includes(name));
    }

    return suppliers;
  }
}
