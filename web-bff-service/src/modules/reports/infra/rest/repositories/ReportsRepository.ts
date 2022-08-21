import rest from '@config/rest';
import { IGetStoragesCapacityBySender } from '@modules/reports/domain/models/requests/IGetStoragesCapacityBySender';
import { IStoragesCapacity } from '@modules/reports/domain/models/responses/IStoragesCapacity';
import { IReportsRepository } from '@modules/reports/domain/repositories/IReportsRepository';

export class ReportsRepository implements IReportsRepository {
  private restClient;
  constructor() {
    this.restClient = rest.getHttpClient(rest.Services.Reports);
  }
  public async getAllStoragesCapacityBySender(
    request: IGetStoragesCapacityBySender,
  ): Promise<IStoragesCapacity[] | undefined> {
    try {
      const { data, status } = await this.restClient.get<IStoragesCapacity[]>(
        `/reports/${request.senderId}/storages-capacity`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log(
        `request all storages capacity reports by sender: ${JSON.stringify(
          request,
        )}, response status is: ${status}`,
      );

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
