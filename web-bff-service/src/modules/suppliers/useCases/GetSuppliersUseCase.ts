import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetSuppliers } from '../domain/models/requests/IGetSuppliers';
import { ISuppliers } from '../domain/models/responses/ISuppliers';
import { ISuppliersRepository } from '../domain/repositories/ISuppliersRepository';
@injectable()
export default class GetSuppliersUseCase {
  private scope = '[GetSuppliersUseCase]';
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,
  ) {}

  public async execute(data: IGetSuppliers): Promise<ISuppliers> {
    const method = '[execute]';
    console.time(
      `[INFO]${this.scope}${method} Request ${JSON.stringify(
        data,
      )} from service`,
    );
    const supplier = await this.suppliersRepository.getById(data);

    if (!supplier) {
      console.timeEnd(
        `[INFO]${this.scope}${method} Request ${JSON.stringify(
          data,
        )} from service`,
      );
      throw new AppErrors('Supplier not found');
    }

    console.timeEnd(
      `[INFO]${this.scope}${method} Request ${JSON.stringify(
        data,
      )} from service`,
    );
    return supplier;
  }
}
