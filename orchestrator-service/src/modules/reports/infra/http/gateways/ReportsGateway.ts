import { reportsService } from '@config/gateway/config';
import { IReportsGateway } from '@modules/reports/domain/gateways/IReportsGateway';
import axios from '@config/axios/AxiosClient';
import { IRegisterStoragesReport } from '@modules/reports/domain/models/requests/IRegisterStoragesReport';
import { IStoragesReport } from '@modules/reports/domain/models/responses/IStoragesReport';

export class ReportsGateway implements IReportsGateway {
  public async registerStoragesCapacity(
    request: IRegisterStoragesReport,
  ): Promise<IStoragesReport | undefined> {
    try {
      const { data, status } = await axios.post<IStoragesReport>(
        `${reportsService.address}/reports/storages-capacity`,
        request,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log(
        `request register storage capacity reports: ${JSON.stringify(
          request,
        )}, response status is: ${status}`,
      );
      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
