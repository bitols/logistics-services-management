import { JwtPayload, sign, verify } from 'jsonwebtoken';
import authConfig from '@config/authConfig';
import { ISessionsRepository } from '@modules/credentials/domain/repositories/ISessionsRepository';

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    id: string;
    email: string;
    sender: string;
  }
}

export default class SessionsRepository implements ISessionsRepository {
  public async create(
    id: string,
    email: string,
    senderId: string,
  ): Promise<string> {
    const JWTToken = sign({ id, email, senderId }, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.expiresIn,
    });

    return JWTToken;
  }

  public async validation(
    token: string,
  ): Promise<{ id: string; email: string; senderId: string }> {
    const payload = verify(token, authConfig.jwt.secret) as JwtPayload;

    return {
      id: payload.id,
      email: payload.email,
      senderId: payload.senderId,
    };
  }
}
