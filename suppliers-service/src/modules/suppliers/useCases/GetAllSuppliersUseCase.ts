import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { ISuppliersResponse } from '../domain/models/responses/ISuppliersResponse';
import { ISuppliersRepository } from '../domain/repositories/ISuppliersRepository';
import { IGetAllSuppliersUseCase } from '../domain/useCases/IGetAllSuppliersUseCase';

@injectable()
export default class GetAllSuppliersUseCase implements IGetAllSuppliersUseCase {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,
  ) {}

  public async execute(): Promise<ISuppliersResponse[]> {
    const suppliers = await this.suppliersRepository.getAll();
    if (!suppliers.length) {
      throw new AppErrors('Suppliers not found');
    }

    return suppliers.map(supplier => supplier as ISuppliersResponse);
  }
}
