import rest from '@config/rest';
import { ICreateSessions } from '@modules/sessions/domain/models/requests/ICreateSessions';
import { IValidationSessions } from '@modules/sessions/domain/models/requests/IValidationSessions';
import { ICredentials } from '@modules/sessions/domain/models/responses/ICredentials';
import { ISessions } from '@modules/sessions/domain/models/responses/ISessions';
import { ISessionsRepository } from '@modules/sessions/domain/repositories/ISessionsRepository';
export default class SessionsRepository implements ISessionsRepository {
  private restClient;
  constructor() {
    this.restClient = rest.getHttpClient(rest.Services.Credencials);
  }
  public async createSession(
    request: ICreateSessions,
  ): Promise<ISessions | undefined> {
    try {
      const { data, status } = await this.restClient.post<ISessions>(
        '/sessions',
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
      console.log(` response status is: ${status}`);

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
