import { IProductsGateway } from '@modules/products/domain/IProductsGateway';
import { IGetAllProductsBySenderIdRequest } from '@shared-types/products/domain/models/requests/IGetAllProductsBySenderIdRequest';
import { IGetAllProductsByStorageIdRequest } from '@shared-types/products/domain/models/requests/IGetAllProductsByStoragedRequest';
import { IGetProductsRequest } from '@shared-types/products/domain/models/requests/IGetProductsRequest';
import { IProductsResponse } from '@shared-types/products/domain/models/responses/IProductsResponse';
import axios from 'axios';

export class ProductsGateway implements IProductsGateway {
  public async getById(
    request: IGetProductsRequest,
  ): Promise<IProductsResponse | undefined> {
    console.log('request product: ', request);

    try {
      const { data, status } = await axios.get<IProductsResponse>(
        `${process.env.API_PRODUCTS_ADDRESS}/products/${request.id}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log(JSON.stringify(data, null, 4));

      // 👇️ "response status is: 200"
      console.log('response status is: ', status);

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  public async getAllBySender(
    request: IGetAllProductsBySenderIdRequest,
  ): Promise<IProductsResponse[] | undefined> {
    console.log('request all products by sender', request);

    try {
      const { data, status } = await axios.get<IProductsResponse[]>(
        `${process.env.API_PRODUCTS_ADDRESS}/products/sender/${request.senderId}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log(JSON.stringify(data, null, 4));

      // 👇️ "response status is: 200"
      console.log('response status is: ', status);

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }

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

      console.log(JSON.stringify(data, null, 4));

      // 👇️ "response status is: 200"
      console.log('response status is: ', status);

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
