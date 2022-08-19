import rest from '@config/rest';
import { ISuppliersRepository } from '@modules/suppliers/domain/repositories/ISuppliersRepository';
import { IGetSuppliersRequest } from '@shared-types/suppliers/domain/models/requests/IGetSuppliersRequest';
import { ISuppliersResponse } from '@shared-types/suppliers/domain/models/responses/ISuppliersResponse';

export class SuppliersRepository implements ISuppliersRepository {
  private restClient;
  constructor() {
    this.restClient = rest.getHttpClient(rest.Services.Suppliers);
  }
  public async getAll(): Promise<ISuppliersResponse[] | undefined> {
    console.log('request all suppliers');

    try {
      const { data, status } = await this.restClient.get<
        ISuppliersResponse[] | undefined
      >('/suppliers/', {
        headers: {
          Accept: 'application/json',
        },
      });

      console.log(JSON.stringify(data, null, 4));

      // 👇️ "response status is: 200"
      console.log('response status is: ', status);

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  public async getById(
    request: IGetSuppliersRequest,
  ): Promise<ISuppliersResponse | undefined> {
    console.log('request supplier: ', request);
    try {
      const { data, status } = await this.restClient.get<
        ISuppliersResponse | undefined
      >(`/suppliers/${request.id}`, {
        headers: {
          Accept: 'application/json',
        },
      });

      console.log(JSON.stringify(data, null, 4));

      // 👇️ "response status is: 200"
      console.log('response status is: ', status);

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
