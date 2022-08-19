import rest from '@config/rest';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { ICreateProductsRequest } from '@shared-types/products/domain/models/requests/ICreateProductsRequest';
import { IGetAllProductsBySenderIdRequest } from '@shared-types/products/domain/models/requests/IGetAllProductsBySenderIdRequest';
import { IGetAllProductsByStorageIdRequest } from '@shared-types/products/domain/models/requests/IGetAllProductsByStoragedRequest';
import { IGetProductsRequest } from '@shared-types/products/domain/models/requests/IGetProductsRequest';
import { IProductsResponse } from '@shared-types/products/domain/models/responses/IProductsResponse';
export class ProductsRepository implements IProductsRepository {
  private restClient;
  constructor() {
    this.restClient = rest.getHttpClient(rest.Services.Products);
  }

  public async create(
    request: ICreateProductsRequest,
  ): Promise<IProductsResponse | undefined> {
    try {
      const { data, status } = await this.restClient.post<IProductsResponse>(
        '/products/',
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
      const { data, status } = await this.restClient.get<IProductsResponse>(
        `/products/${request.id}`,
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
      const { data, status } = await this.restClient.get<IProductsResponse[]>(
        `/products/sender/${request.senderId}`,
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
      const { data, status } = await this.restClient.get<IProductsResponse[]>(
        `/products/storage/${request.storageId}`,
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
