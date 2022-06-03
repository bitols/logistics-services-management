import { IGetSendersRequest } from '@shared-types/senders/domain/models/requests/IGetSendersRequest';
import { IGetSendersStoragesInfoUseCase } from '../domain/useCases/IGetSendersStoragesInfoUseCase';
import { IProductsGateway } from '@modules/products/domain/gateways/IProductsGateway';
import { IStoragesGateway } from '@modules/storages/domain/gateways/IStoragesGateway';
import { inject, injectable } from 'tsyringe';
import AppErrors from '@shared/errors/AppErrors';

@injectable()
export class GetSendersStoragesInfoUseCase
  implements IGetSendersStoragesInfoUseCase
{
  constructor(
    @inject('StoragesGateway')
    private storagesGateway: IStoragesGateway,
    @inject('ProductsGateway')
    private productsGateway: IProductsGateway,
  ) {}

  public async execute(data: IGetSendersRequest): Promise<any> {
    const products = await this.productsGateway.getAllBySender({
      senderId: data.id,
    });

    if (!products) {
      throw new AppErrors('Products not found');
    }

    const storages = await Promise.all(
      products
        .map(x => x.storageId)
        .filter((x, i, a) => a.indexOf(x) == i)
        .map(async x => this.storagesGateway.getById({ id: x })),
    );

    return storages.map(x => {
      const details = products
        .filter(y => y.storageId == x?.id)
        .map(x => {
          return {
            volume: x.height * x.width * x.lenght,
            value: x.price,
          };
        })
        .reduce((pre, cur) => {
          return {
            volume: pre.volume + cur.volume,
            value: pre.value + cur.value,
          };
        });

      return {
        id: x?.id,
        name: x?.name,
        email: x?.email,
        phone: x?.phone,
        address: x?.address,
        storedVolume: (Math.round(details.volume * 100) / 100).toFixed(3),
        storedValue: (Math.round(details.value * 100) / 100).toFixed(2),
      };
    });
  }
}
