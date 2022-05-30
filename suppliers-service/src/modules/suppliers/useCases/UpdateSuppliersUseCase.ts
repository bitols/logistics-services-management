import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IUpdateSuppliersRequest } from '@shared-types/suppliers/domain/models/requests/IUpdateSuppliersRequest';
import { ISuppliersResponse } from '@shared-types/suppliers/domain/models/responses/ISuppliersResponse';
import { ISuppliersRepository } from '../domain/repositories/ISuppliersRepository';
import { IUpdateSuppliersUseCase } from '../domain/useCases/IUpdateSuppliersUseCase';

@injectable()
export default class UpdateSuppliersUseCase implements IUpdateSuppliersUseCase {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,
  ) {}

  public async execute(
    data: IUpdateSuppliersRequest,
  ): Promise<ISuppliersResponse> {
    const supplier = await this.suppliersRepository.getById(data.id);

    if (!supplier) {
      throw new AppErrors('Supplier not found');
    }

    supplier.name = data.name;
    supplier.email = data.email;
    supplier.phone = data.phone;

    await this.suppliersRepository.save(supplier);

    return supplier as ISuppliersResponse;
  }
}
