import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IDeleteSuppliersRequest } from '@shared-types/suppliers/domain/models/requests/IDeleteSuppliersRequests';
import { ISuppliersRepository } from '../domain/repositories/ISuppliersRepository';
import { IDeleteSuppliersUseCase } from '../domain/useCases/IDeleteSuppliersUseCase';

@injectable()
export default class DeleteSuppliersUseCase implements IDeleteSuppliersUseCase {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,
  ) {}

  public async execute(data: IDeleteSuppliersRequest): Promise<void> {
    const supplier = await this.suppliersRepository.getById(data.id);

    if (!supplier) {
      throw new AppErrors('Supplier not found');
    }

    await this.suppliersRepository.remove(supplier);
  }
}
