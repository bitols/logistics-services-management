import gatewayConfig from '@config/gatewayConfig';
import { ICredentialsGateway } from '@modules/credentials/domain/gateways/ICredentialsGateway';
import { ISession } from '@shared-types/credentials/domain/models/entities/ISession';
import { IValidToken } from '@shared-types/credentials/domain/models/requests/IValidToken';
import axios from 'axios';

export default class CredentialsGateway implements ICredentialsGateway {
  public async getSession(request: IValidToken): Promise<ISession | undefined> {
    try {
      const { data, status } = await axios.post<ISession>(
        `${gatewayConfig.credentialsService.address}/sessions/validation`,
        request,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      console.log(
        `request sessiont: ${JSON.stringify(
          request,
        )}, response status is: ${status}`,
      );

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
