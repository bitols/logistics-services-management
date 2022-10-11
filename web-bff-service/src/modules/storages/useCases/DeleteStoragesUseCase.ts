import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IDeleteStorages } from '../domain/models/requests/IDeleteStorages';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';

@injectable()
export default class DeleteStoragesUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
  ) {}

  public async execute(data: IDeleteStorages): Promise<void> {
    const products = await this.storagesRepository.getProducts({
      id: data.id,
    });

    if (products) {
      throw new AppErrors('Need remove products of storage before', 422);
    }

    await this.storagesRepository.delete(data);
  }
}
