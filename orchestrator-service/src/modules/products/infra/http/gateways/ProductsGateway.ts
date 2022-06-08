import { IProductsGateway } from '@modules/products/domain/gateways/IProductsGateway';
import { IGetAllProductsByStorageIdRequest } from '@shared-types/products/domain/models/requests/IGetAllProductsByStoragedRequest';
import { IProductsResponse } from '@shared-types/products/domain/models/responses/IProductsResponse';
import axios from 'axios';

export class ProductsGateway implements IProductsGateway {
  public async getAllByStorage(
    request: IGetAllProductsByStorageIdRequest,
  ): Promise<IProductsResponse[] | undefined> {
    console.log('request all products by storage', request);
    try {
      const { data, status } = await axios.get<IProductsResponse[]>(
        `${process.env.API_PRODUCTS_ADDRESS}/products/storage/${request.storageId}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log('response status is: ', status);
      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
