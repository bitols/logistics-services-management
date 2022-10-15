import { productsService } from '@config/rest/config';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IGetAllProductsBySender } from '@modules/products/domain/models/requests/IGetAllProductsBySender';
import { IProducts } from '@modules/products/domain/models/responses/IProducts';
import rest from '@config/rest';

export class ProductsRepository implements IProductsRepository {
  private restClient;
  constructor() {
    this.restClient = rest.getHttpClient(productsService.address);
  }

  public async getAllBySender(
    request: IGetAllProductsBySender,
  ): Promise<IProducts[] | undefined> {
    try {
      await this.restClient.get(`/products/sender/${request.senderId}`);
      const { data, status } = await this.restClient.get(
        `/products/sender/${request.senderId}`,
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
}
