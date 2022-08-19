import rest from '@config/rest';
import { ICredentialsRepository } from '@modules/credentials/domain/repositories/ICredentialsRepository';
import { ISession } from '@shared-types/credentials/domain/models/entities/ISession';
import { IValidToken } from '@shared-types/credentials/domain/models/requests/IValidToken';
export default class CredentialsRepository implements ICredentialsRepository {
  private restClient;
  constructor() {
    this.restClient = rest.getHttpClient(rest.Services.Credencials);
  }

  public async getSession(request: IValidToken): Promise<ISession | undefined> {
    try {
      const { data, status } = await this.restClient.post<ISession>(
        '/sessions/validation',
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
