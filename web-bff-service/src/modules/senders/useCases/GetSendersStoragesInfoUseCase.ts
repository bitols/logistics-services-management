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
          capacity: x.capacity.toFixed(3),
          stored: details?.volume.toFixed(3),
          usage: details ? ((details.volume * 100) / x.capacity).toFixed(2) : 0,
          products: details?.qtd,
          value: details?.value.toFixed(2),
        },
      };
    });

    const response = await Promise.all(promises);
    return response;
    //   const products = await this.productsGateway.getAllBySender({
    //     senderId: data.id,
    //   });

    //   if (!products) {
    //     throw new AppErrors('Products not found');
    //   }

    //   const storages = await Promise.all(
    //     products
    //       .map(x => x.storageId)
    //       .filter((x, i, a) => a.indexOf(x) == i)
    //       .map(async x => this.storagesGateway.getById({ id: x })),
    //   );

    //   return storages.map(x => {
    //     const details = products
    //       .filter(y => y.storageId == x?.id)
    //       .map(x => {
    //         return {
    //           volume: x.height * x.width * x.lenght,
    //           value: x.price,
    //         };
    //       })
    //       .reduce((pre, cur) => {
    //         return {
    //           volume: pre.volume + cur.volume,
    //           value: pre.value + cur.value,
    //         };
    //       });

    //     return {
    //       id: x?.id,
    //       name: x?.name,
    //       email: x?.email,
    //       phone: x?.phone,
    //       address: x?.address,
    //       storedVolume: (Math.round(details.volume * 100) / 100).toFixed(3),
    //       storedValue: (Math.round(details.value * 100) / 100).toFixed(2),
    //     };
    //   });
    // }
  }
}
