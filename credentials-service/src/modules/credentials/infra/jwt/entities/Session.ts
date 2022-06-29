import { ISession } from '@shared-types/credentials/domain/models/entities/ISession';

export default class Session implements ISession {
  email: string;
  senderId: string;
}
