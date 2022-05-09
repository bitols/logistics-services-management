import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetSuppliersRequest } from '../domain/models/requests/IGetSuppliersRequest';
import { ISuppliersResponse } from '../domain/models/responses/ISuppliersResponse';
import { ISuppliersRepository } from '../domain/repositories/ISuppliersRepository';
import { IGetSuppliersUseCase } from '../domain/useCases/IGetSuppliersUseCase';

@injectable()
export default class GetSuppliersUseCase implements IGetSuppliersUseCase {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,
  ) {}

  public async execute(
    data: IGetSuppliersRequest,
  ): Promise<ISuppliersResponse> {
    const supplier = await this.suppliersRepository.getById(data.id);
    if (!supplier) {
      throw new AppErrors('Supplier not found');
    }

    return supplier as ISuppliersResponse;
  }
}
