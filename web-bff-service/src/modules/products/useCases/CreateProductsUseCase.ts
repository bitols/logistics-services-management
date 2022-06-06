import { ISendersGateway } from '@modules/senders/domain/gateways/ISendersGateway';
import { IStoragesGateway } from '@modules/storages/domain/gateways/IStoragesGateway';
import { ICreateProductsRequest } from '@shared-types/products/domain/models/requests/ICreateProductsRequest';
import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IProductsGateway } from '../domain/gateways/IProductsGateway';
import { ICreateProductUseCase } from '../domain/useCases/ICreateProductsUseCase';

@injectable()
export class CreateProductsUseCase implements ICreateProductUseCase {
  constructor(
    @inject('StoragesGateway')
    private storagesGateway: IStoragesGateway,
    @inject('SendersGateway')
    private sendersGateway: ISendersGateway,
    @inject('ProductsGateway')
    private productsGateway: IProductsGateway,
  ) {}

  public async execute(data: ICreateProductsRequest): Promise<any> {
    const storage = await this.storagesGateway.getById({ id: data.storageId });
    if (!storage) {
      throw new AppErrors('Storage not found');
    }

    const sender = await this.sendersGateway.getById({ id: data.senderId });
    if (!sender) {
      throw new AppErrors('Sender not found');
    }

    if (sender.id !== storage.senderId) {
      throw new AppErrors('Sender and Storage not compatible');
    }

    return await this.productsGateway.create(data);
  }
}