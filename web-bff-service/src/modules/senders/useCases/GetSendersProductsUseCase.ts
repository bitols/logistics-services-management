import { IGetSendersRequest } from '@shared-types/senders/domain/models/requests/IGetSendersRequest';
import { IGetSendersProductsUseCase } from '../domain/useCases/IGetSendersProductsUseCase';
import { IProductsGateway } from '@modules/products/domain/gateways/IProductsGateway';
import { IStoragesGateway } from '@modules/storages/domain/gateways/IStoragesGateway';
import { inject, injectable } from 'tsyringe';
import AppErrors from '@shared/errors/AppErrors';

@injectable()
export class GetSendersProductsUseCase implements IGetSendersProductsUseCase {
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
        .map(product => product.storageId)
        .filter((x, i, a) => a.indexOf(x) == i)
        .map(
          async storageId =>
            await this.storagesGateway.getById({ id: storageId }),
        ),
    );

    return storages.map(storage => ({
      ...storage,
      products: products.filter(product => product.storageId == storage?.id),
    }));
  }
}
