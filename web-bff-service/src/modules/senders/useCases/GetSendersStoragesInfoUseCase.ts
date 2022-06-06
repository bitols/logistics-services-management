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
    const storages = await this.storagesGateway.getAllBySender({
      senderId: data.id,
    });

    if (!storages) {
      throw new AppErrors('Storages not found');
    }

    const promises = storages.map(async x => {
      const products = await this.productsGateway.getAllByStorage({
        storageId: x.id,
      });

      const details = products
        ?.map(x => {
          return {
            volume: x.height * x.width * x.lenght,
            value: x.price,
            qtd: 1,
          };
        })
        .reduce((pre, cur) => {
          return {
            volume: pre.volume + cur.volume,
            value: pre.value + cur.value,
            qtd: pre.qtd + cur.qtd,
          };
        });

      return {
        id: x.id,
        name: x.name,
        email: x.email,
        phone: x.phone,
        address: x.address,
        indicators: {
          capacity: x.capacity,
          stored: details ? Number(details.volume.toFixed(3)) : 0,
          usage: details
            ? Number(((details.volume * 100) / x.capacity).toFixed(2))
            : 0,
          products: details ? details.qtd : 0,
          value: details ? Number(details.value.toFixed(2)) : 0,
        },
      };
    });

    const response = await Promise.all(promises);
    return response;
  }
}
