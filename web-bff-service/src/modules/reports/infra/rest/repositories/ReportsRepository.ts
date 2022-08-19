import rest from '@config/rest';
import { IReportsRepository } from '@modules/reports/domain/repositories/IReportsRepository';
import { IGetAllStoragesCapacityBySenderIdRequest } from '@shared-types/reports/domain/models/requests/IGetAllStoragesCapacityBySenderIdRequest';
import { IStoragesCapacityResponse } from '@shared-types/reports/domain/models/responses/IStoragesCapacityResponse';

export class ReportsRepository implements IReportsRepository {
  private restClient;
  constructor() {
    this.restClient = rest.getHttpClient(rest.Services.Reports);
  }
  public async getAllStoragesCapacityBySender(
    request: IGetAllStoragesCapacityBySenderIdRequest,
  ): Promise<IStoragesCapacityResponse[] | undefined> {
    try {
      const { data, status } = await this.restClient.get<
        IStoragesCapacityResponse[]
      >(`/reports/${request.senderId}/storages-capacity`, {
        headers: {
          Accept: 'application/json',
        },
      });

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
