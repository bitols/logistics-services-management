import { productsService } from '@config/rest/config';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IGetAllProductsByStorageId } from '@modules/products/domain/models/requests/IGetAllProductsByStorageId';
import { IProducts } from '@modules/products/domain/models/responses/IProducts';
import rest from '@config/rest';

export class ProductsRepository implements IProductsRepository {
  private restClient;
  constructor() {
    this.restClient = rest.getHttpClient(productsService.address);
  }

  public async getAllByStorage(
    request: IGetAllProductsByStorageId,
  ): Promise<IProducts[] | undefined> {
    try {
      await this.restClient.get(`/products/storage/${request.storageId}`);
      const { data, status } = await this.restClient.get(
        `/products/storage/${request.storageId}`,
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
