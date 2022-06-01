import { IProductsGateway } from '@modules/products/domain/IProductsGateway';
import { IGetSendersRequest } from '@shared-types/senders/domain/models/requests/IGetSendersRequest';
import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { ISendersGateway } from '../domain/gateways/ISendersGateway';
import { IGetSendersInfoUseCase } from '../domain/useCases/IGetSendersInfoUseCase';

@injectable()
export class GetSenderInfoUseCase implements IGetSendersInfoUseCase {
  constructor(
    @inject('SendersGateway')
    private sendersGateway: ISendersGateway,
    @inject('ProductsGateway')
    private productsGateway: IProductsGateway,
  ) {}

  public async execute(data: IGetSendersRequest): Promise<any> {
    const sender = await this.sendersGateway.getById(data);
    if (!sender) {
      throw new AppErrors('Sender not found');
    }

    const products = await this.productsGateway.getAllBySender({
      senderId: sender.id,
    });

    return {
      id: sender.id,
      name: sender.name,
      email: sender.email,
      phone: sender.phone,
      products: products?.length,
      storages: products
        ?.map(x => x.storageId)
        .filter((x, i, a) => a.indexOf(x) == i).length,
    };
  }
}
