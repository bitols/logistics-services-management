import { ISendersRepository } from '@modules/senders/domain/repositories/ISendersRepository';
import { IStoragesRepository } from '@modules/storages/domain/repositories/IStoragesRepository';
import { ICreateProductsRequest } from '@shared-types/products/domain/models/requests/ICreateProductsRequest';
import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { ICreateProductUseCase } from '../domain/useCases/ICreateProductsUseCase';

@injectable()
export class CreateProductsUseCase implements ICreateProductUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
    @inject('SendersRepository')
    private sendersRepository: ISendersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(data: ICreateProductsRequest): Promise<any> {
    const storage = await this.storagesRepository.getById({
      id: data.storageId,
    });
    if (!storage) {
      throw new AppErrors('Storage not found');
    }

    const sender = await this.sendersRepository.getById({ id: data.senderId });
    if (!sender) {
      throw new AppErrors('Sender not found');
    }

    if (sender.id !== storage.senderId) {
      throw new AppErrors('Sender and Storage not compatible');
    }

    return await this.productsRepository.create(data);
  }
}
