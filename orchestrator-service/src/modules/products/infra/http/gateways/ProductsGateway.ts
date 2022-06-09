import { IProductsGateway } from '@modules/products/domain/gateways/IProductsGateway';
import { IGetAllProductsByStorageIdRequest } from '@shared-types/products/domain/models/requests/IGetAllProductsByStoragedRequest';
import { IProductsResponse } from '@shared-types/products/domain/models/responses/IProductsResponse';
import axios from 'axios';

export class ProductsGateway implements IProductsGateway {
  public async getAllByStorage(
    request: IGetAllProductsByStorageIdRequest,
  ): Promise<IProductsResponse[] | undefined> {
    try {
      const { data, status } = await axios.get<IProductsResponse[]>(
        `${process.env.API_PRODUCTS_ADDRESS}/products/storage/${request.storageId}`,
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
