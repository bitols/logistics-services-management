import rest from '@config/rest';
import { IReceiversRepository } from '@modules/receivers/domain/repositories/IReceiversRepository';
import { IGetReceiversRequest } from '@shared-types/receivers/domain/models/requests/IGetReceiversRequest';
import { IReceiversResponse } from '@shared-types/receivers/domain/models/responses/IReceiversResponse';

export class ReceiversRepository implements IReceiversRepository {
  private restClient;
  constructor() {
    this.restClient = rest.getHttpClient(rest.Services.Receivers);
  }

  public async getById(
    request: IGetReceiversRequest,
  ): Promise<IReceiversResponse | undefined> {
    console.log('request receiver: ', request);

    try {
      const { data, status } = await this.restClient.get<IReceiversResponse>(
        `/receivers/${request.id}`,
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

  public async getAll(): Promise<IReceiversResponse[] | undefined> {
    console.log('request all receivers');

    try {
      const { data, status } = await this.restClient.get<IReceiversResponse[]>(
        `/receivers/`,
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
