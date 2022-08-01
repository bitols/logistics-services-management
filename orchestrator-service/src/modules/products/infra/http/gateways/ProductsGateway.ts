import gatewayConfig from '@config/gatewayConfig';
import { IProductsGateway } from '@modules/products/domain/gateways/IProductsGateway';
import { IGetAllProductsByStorageId } from '@modules/products/domain/models/requests/IGetAllProductsByStorageId';
import { IProducts } from '@modules/products/domain/models/responses/IProducts';
import axios from 'axios';

export class ProductsGateway implements IProductsGateway {
  public async getAllByStorage(
    request: IGetAllProductsByStorageId,
  ): Promise<IProducts[] | undefined> {
    try {
      const { data, status } = await axios.get<IProducts[]>(
        `${gatewayConfig.productsService.address}/products/storage/${request.storageId}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log(
        `request all products by storage: ${JSON.stringify(
          request,
        )}, response status is: ${status}`,
      );

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
