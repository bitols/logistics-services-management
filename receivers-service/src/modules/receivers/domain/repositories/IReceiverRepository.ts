import { IReceiver } from '@shared-types/receivers/domain/models/entities/IReceiver';
import { ICreateReceiversRequest } from '@shared-types/receivers/domain/models/requests/ICreateReceiversRequest';

export interface IReceiversRepository {
  create(data: ICreateReceiversRequest): Promise<IReceiver>;
  save(receiver: IReceiver): Promise<IReceiver>;
  remove(receiver: IReceiver): Promise<void>;
  getById(id: string): Promise<IReceiver | undefined>;
  getAll(): Promise<IReceiver[]>;
}
