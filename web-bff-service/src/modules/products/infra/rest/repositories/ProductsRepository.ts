import rest from '@config/rest';
import { ICreateProducts } from '@modules/products/domain/models/requests/ICreateProducts';
import { IGetProductsBySender } from '@modules/products/domain/models/requests/IGetProductsBySender';
import { IGetProductsByStorage } from '@modules/products/domain/models/requests/IGetProductsByStorage';
import { IGetProducts } from '@modules/products/domain/models/requests/IGetProducts';
import { IProducts } from '@modules/products/domain/models/responses/IProducts';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
export class ProductsRepository implements IProductsRepository {
  private restClient;
  constructor() {
    this.restClient = rest.getHttpClient(rest.Services.Products);
  }

  public async create(
    request: ICreateProducts,
  ): Promise<IProducts | undefined> {
    try {
      const { data, status } = await this.restClient.post<IProducts>(
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

  public async getById(request: IGetProducts): Promise<IProducts | undefined> {
    try {
      const { data, status } = await this.restClient.get<IProducts>(
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
    request: IGetProductsBySender,
  ): Promise<IProducts[] | undefined> {
    try {
      const { data, status } = await this.restClient.get<IProducts[]>(
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
    request: IGetProductsByStorage,
  ): Promise<IProducts[] | undefined> {
    try {
      const { data, status } = await this.restClient.get<IProducts[]>(
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
