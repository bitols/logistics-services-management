import rest from '@config/rest';
import { ISendersRepository } from '@modules/senders/domain/repositories/ISendersRepository';
import { IGetSendersRequest } from '@shared-types/senders/domain/models/requests/IGetSendersRequest';
import { ISendersResponse } from '@shared-types/senders/domain/models/responses/ISendersResponse';
export class SendersRepository implements ISendersRepository {
  private restClient;
  constructor() {
    this.restClient = rest.getHttpClient(rest.Services.Senders);
  }

  public async getAll(): Promise<ISendersResponse[] | undefined> {
    try {
      const { data, status } = await this.restClient.get<ISendersResponse[]>(
        '/senders/',
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log(`request all senders, response status is: ${status}`);

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  public async getById(
    request: IGetSendersRequest,
  ): Promise<ISendersResponse | undefined> {
    try {
      const { data, status } = await this.restClient.get<ISendersResponse>(
        `/senders/${request.id}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log(
        `request sender: ${JSON.stringify(
          request,
        )}, response status is: ${status}`,
      );

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
