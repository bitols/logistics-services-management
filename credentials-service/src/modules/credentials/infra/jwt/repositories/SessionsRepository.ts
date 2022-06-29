import { sign, verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { ISessionsRepository } from '@modules/credentials/domain/repositories/ISessionsRepository';
import { ISession } from '@shared-types/credentials/domain/models/entities/ISession';
import { ITokenSession } from '@shared-types/credentials/domain/models/entities/ITokenSession';

export default class SessionsRepository implements ISessionsRepository {
  public async create(request: ISession): Promise<ITokenSession> {
    const JWTToken = sign(request, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      token: JWTToken,
    };
  }

  public async validation(request: ITokenSession): Promise<ISession> {
    const decodedPayload = verify(request.token, authConfig.jwt.secret);

    return decodedPayload as ISession;
  }
}
