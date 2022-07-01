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

  public async execute(): Promise<ISuppliers[]> {
    const suppliers = await this.suppliersRepository.getAll();
    if (!suppliers.length) {
      throw new AppErrors('Suppliers not found');
    }

    return suppliers.map(supplier => {
      const dados: ISuppliers = {
        id: supplier.id,
        email: supplier.email,
        name: supplier.name,
        phone: supplier.phone,
      };

      return dados;
    });
  }
}
