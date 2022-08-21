import rest from '@config/rest';
import { IGetReceivers } from '@modules/receivers/domain/models/requests/IGetReceivers';
import { IReceivers } from '@modules/receivers/domain/models/responses/IReceivers';
import { IReceiversRepository } from '@modules/receivers/domain/repositories/IReceiversRepository';
export class ReceiversRepository implements IReceiversRepository {
  private restClient;
  constructor() {
    this.restClient = rest.getHttpClient(rest.Services.Receivers);
  }

  public async getById(
    request: IGetReceivers,
  ): Promise<IReceivers | undefined> {
    try {
      const { data, status } = await this.restClient.get<IReceivers>(
        `/receivers/${request.id}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log(
        `request receiver ${JSON.stringify(
          request,
        )}, response status is: ${status}`,
      );
      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  public async getAll(): Promise<IReceivers[] | undefined> {
    try {
      const { data, status } = await this.restClient.get<IReceivers[]>(
        `/receivers/`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log(`request all receivers, response status is: ${status}`);

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
