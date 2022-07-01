import { IReceiver } from '../models/entities/IReceiver';
import { ICreateReceivers } from '../models/requests/ICreateReceivers';

export interface IReceiversRepository {
  create(data: ICreateReceivers): Promise<IReceiver>;
  save(receiver: IReceiver): Promise<IReceiver>;
  remove(receiver: IReceiver): Promise<void>;
  getById(id: string): Promise<IReceiver | null | undefined>;
  getAll(): Promise<IReceiver[]>;
}
