import gatewayConfig from '@config/gatewayConfig';
import { IProductsGateway } from '@modules/products/domain/gateways/IProductsGateway';
import { ICreateProductsRequest } from '@shared-types/products/domain/models/requests/ICreateProductsRequest';
import { IGetAllProductsBySenderIdRequest } from '@shared-types/products/domain/models/requests/IGetAllProductsBySenderIdRequest';
import { IGetAllProductsByStorageIdRequest } from '@shared-types/products/domain/models/requests/IGetAllProductsByStoragedRequest';
import { IGetProductsRequest } from '@shared-types/products/domain/models/requests/IGetProductsRequest';
import { IProductsResponse } from '@shared-types/products/domain/models/responses/IProductsResponse';
import axios from 'axios';

export class ProductsGateway implements IProductsGateway {
  public async create(
    request: ICreateProductsRequest,
  ): Promise<IProductsResponse | undefined> {
    try {
      const { data, status } = await axios.post<IProductsResponse>(
        `${gatewayConfig.productsService.address}/products/`,
        request,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log(
        `request create product: ${JSON.stringify(
          request,
        )}, response status is: ${status}`,
      );
      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  public async getById(
    request: IGetProductsRequest,
  ): Promise<IProductsResponse | undefined> {
    try {
      const { data, status } = await axios.get<IProductsResponse>(
        `${gatewayConfig.productsService.address}/products/${request.id}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log(
        `request product: ${JSON.stringify(
          request,
        )}, response status is: ${status}`,
      );

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  public async getAllBySender(
    request: IGetAllProductsBySenderIdRequest,
  ): Promise<IProductsResponse[] | undefined> {
    try {
      const { data, status } = await axios.get<IProductsResponse[]>(
        `${gatewayConfig.productsService.address}/products/sender/${request.senderId}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log(
        `request all products by sender: ${JSON.stringify(
          request,
        )}, response status is: ${status}`,
      );

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  public async getAllByStorage(
    request: IGetAllProductsByStorageIdRequest,
  ): Promise<IProductsResponse[] | undefined> {
    try {
      const { data, status } = await axios.get<IProductsResponse[]>(
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
