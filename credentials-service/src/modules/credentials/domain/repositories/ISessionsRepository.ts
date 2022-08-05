import { IJwtPayload } from '../models/entities/IJwtPayload';

export interface ISessionsRepository {
  create(id: string, email: string, senderId: string): Promise<string>;
  validation(token: string): Promise<IJwtPayload>;
}
