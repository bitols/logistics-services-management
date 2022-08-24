import { ISessionsRepository } from '@modules/credentials/domain/repositories/ISessionsRepository';
import { IJwtPayload } from '@modules/credentials/domain/models/entities/IJwtPayload';
import { create, validate } from '@config/auth';

export default class SessionsRepository implements ISessionsRepository {
  public async validation(token: string): Promise<IJwtPayload> {
    console.log(`token session validation: ${token}`);
    const payload = await validate(token);
    return {
      id: payload.id,
      email: payload.email,
      senderId: payload.senderId,
    };
  }

  public async creation(
    id: string,
    email: string,
    senderId: string,
  ): Promise<string> {
    console.log(`create session for email: ${email}`);
    const JWTToken = await create({ id, email, senderId });

    return JWTToken;
  }
}
