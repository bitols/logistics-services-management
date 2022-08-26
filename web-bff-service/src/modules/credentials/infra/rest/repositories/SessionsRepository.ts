import rest from '@config/rest';
import { IValidationSessions } from '@modules/credentials/domain/models/requests/IValidationSessions';
import { ICredentials } from '@modules/credentials/domain/models/responses/ICredentials';
import { ISessionsRepository } from '@modules/credentials/domain/repositories/ISessionsRepository';
export default class SessionsRepository implements ISessionsRepository {
  private restClient;
  constructor() {
    this.restClient = rest.getHttpClient(rest.Services.Credencials);
  }

  public async validateSession(
    request: IValidationSessions,
  ): Promise<ICredentials | undefined> {
    try {
      const { data, status } = await this.restClient.post<ICredentials>(
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
