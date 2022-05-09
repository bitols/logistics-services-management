import { inject, injectable } from 'tsyringe';
import { ICreateSuppliersRequest } from '../domain/models/requests/ICreateSuppliersRequest';
import { ISuppliersResponse } from '../domain/models/responses/ISuppliersResponse';
import { ISuppliersRepository } from '../domain/repositories/ISuppliersRepository';
import { ICreateSuppliersUseCase } from '../domain/useCases/ICreateSuppliersUseCase';

@injectable()
export default class CreateSuppliersUseCase implements ICreateSuppliersUseCase {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,
  ) {}

  public async execute(
    data: ICreateSuppliersRequest,
  ): Promise<ISuppliersResponse> {
    const supplier = await this.suppliersRepository.create(data);

    await this.suppliersRepository.save(supplier);

    return supplier as ISuppliersResponse;
  }
}
