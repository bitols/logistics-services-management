import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IDeleteStorages } from '../domain/models/requests/IDeleteStorages';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';

@injectable()
export default class DeleteStoragesproductsUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
  ) {}

  public async execute(data: IDeleteStorages): Promise<void> {
    await this.storagesRepository.rmvProducts(data);
  }
}
