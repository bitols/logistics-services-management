import { IProductsGateway } from '@modules/products/domain/gateways/IProductsGateway';
import { IStoragesGateway } from '@modules/storages/domain/gateways/IStoragesGateway';
import { IGetStoragesRequest } from '@shared-types/storages/domain/models/requests/IGetStoragesRequest';
import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGenerateStoragesCapacitysUseCase } from '../domain/useCases/IGenerateStoragesCapacityUseCase';
@injectable()
export default class GenerateStoragesCapacitysUseCase
  implements IGenerateStoragesCapacitysUseCase
{
  constructor(
    @inject('StoragesGateway')
    private storagesGateway: IStoragesGateway,
    @inject('ProductsGateway')
    private productsGateway: IProductsGateway,
  ) {}

  public async execute(request: IGetStoragesRequest): Promise<void> {
    const storage = await this.storagesGateway.getById({ id: request.id });

    if (!storage) {
      throw new AppErrors('Storage not found');
    }

    const products = await this.productsGateway.getAllByStorage({
      storageId: storage.id,
    });

    const data = products
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

    const capacity = {
      storageId: storage.id,
      capacity: storage.capacity,
      stored: data ? Number(data.volume.toFixed(3)) : 0,
      usage: data
        ? Number(((data.volume * 100) / storage.capacity).toFixed(2))
        : 0,
      products: data ? data.qtd : 0,
      value: data ? Number(data.value.toFixed(2)) : 0,
      senderId: storage.senderId,
    };
    console.log(`storage capacity control: ${JSON.stringify(capacity)}`);
  }
}
