import gatewayConfig from '@config/gatewayConfig';
import { IReportsGateway } from '@modules/reports/domain/gateways/IReportsGateway';
import { IRegisterStoragesCapacityRequest } from '@shared-types/reports/domain/models/requests/IRegisterStoragesCapacityRequest';
import { IStoragesCapacityResponse } from '@shared-types/reports/domain/models/responses/IStoragesCapacityResponse';
import axios from 'axios';

export class ReportsGateway implements IReportsGateway {
  public async registerStoragesCapacity(
    request: IRegisterStoragesCapacityRequest,
  ): Promise<IStoragesCapacityResponse | undefined> {
    try {
      const { data, status } = await axios.post<IStoragesCapacityResponse>(
        `${gatewayConfig.reportsService.address}/reports/storages-capacity`,
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
