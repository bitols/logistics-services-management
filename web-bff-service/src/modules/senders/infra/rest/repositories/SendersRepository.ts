import rest from '@config/rest';
import { IGetSenders } from '@modules/senders/domain/models/requests/IGetSenders';
import { ISenders } from '@modules/senders/domain/models/responses/ISenders';
import { ISendersRepository } from '@modules/senders/domain/repositories/ISendersRepository';

export class SendersRepository implements ISendersRepository {
  private restClient;
  constructor() {
    this.restClient = rest.getHttpClient(rest.Services.Senders);
  }

  public async getAll(): Promise<ISenders[] | undefined> {
    try {
      const { data, status } = await this.restClient.get<ISenders[]>(
        '/senders/',
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  public async getById(request: IGetSenders): Promise<ISenders | undefined> {
    try {
      const { data, status } = await this.restClient.get<ISenders>(
        `/senders/${request.id}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
