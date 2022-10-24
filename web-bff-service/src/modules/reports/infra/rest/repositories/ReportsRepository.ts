import rest from '@config/rest';
import { IGetStoragesReport } from '@modules/reports/domain/models/requests/IGetStoragesReport';
import { IStoragesReport } from '@modules/reports/domain/models/responses/IStoragesReport';
import { IReportsRepository } from '@modules/reports/domain/repositories/IReportsRepository';

export class ReportsRepository implements IReportsRepository {
  private restClient;
  constructor() {
    this.restClient = rest.getHttpClient(rest.Services.Reports);
  }
  public async getStoragesReport(
    request: IGetStoragesReport,
  ): Promise<IStoragesReport | undefined> {
    try {
      const { data, status } = await this.restClient.get<IStoragesReport>(
        `/reports/storages/${request.storageId}`,
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
