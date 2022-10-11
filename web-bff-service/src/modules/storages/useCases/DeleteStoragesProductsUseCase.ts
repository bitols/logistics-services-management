import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IDeleteStorageProducts } from '../domain/models/requests/IDeleteStorageProducts';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';

@injectable()
export default class DeleteStoragesproductsUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
  ) {}

  public async execute(data: IDeleteStorageProducts): Promise<void> {
    await this.storagesRepository.rmvProducts(data);
  }
}
