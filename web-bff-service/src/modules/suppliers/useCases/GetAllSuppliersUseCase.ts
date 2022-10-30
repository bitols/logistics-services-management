import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { ISuppliers } from '../domain/models/responses/ISuppliers';
import { ISuppliersRepository } from '../domain/repositories/ISuppliersRepository';

@injectable()
export default class GetAllSuppliersUseCase {
  private scope = '[GetAllSuppliersUseCase]';
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,
  ) {}

  public async execute(name?: string): Promise<ISuppliers[]> {
    const method = '[execute]';

    console.time(`[INFO]${this.scope}${method} Request all from service`);

    let suppliers: ISuppliers[] | undefined;
    suppliers = await this.suppliersRepository.getAll();
    if (!suppliers) {
      console.warn(`[WARN]${this.scope}${method} Suppliers not found`);
      throw new AppErrors('Suppliers not found');
    }

    if (name) {
      suppliers = suppliers.filter(supplier => supplier.name.includes(name));
    }
    console.timeEnd(`[INFO]${this.scope}${method} Request all from service`);
    return suppliers;
  }
}
