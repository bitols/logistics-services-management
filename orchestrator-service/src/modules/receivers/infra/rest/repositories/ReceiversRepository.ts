import rest from '@config/rest';
import { receiversService } from '@config/rest/config';
import { IUpdateReceiversLocation } from '@modules/receivers/domain/models/requests/IUpdateReceiversLocation';
import { IReceivers } from '@modules/receivers/domain/models/responses/IReceivers';
import { IReceiversRepository } from '@modules/receivers/domain/repositories/IReceiversRepository';

export class ReceiversRepository implements IReceiversRepository {
  private restClient;
  constructor() {
    this.restClient = rest.getHttpClient(receiversService.address);
  }

  public async updateLocation(
    request: IUpdateReceiversLocation,
  ): Promise<IReceivers | undefined> {
    try {
      const { data, status } = await this.restClient.patch<IReceivers>(
        `/receivers/${request.id}/location`,
        { location: request.location },
      );

      console.log(
        `request update Location receiver: ${JSON.stringify(
          request,
        )}, response status is: ${status}`,
      );

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
