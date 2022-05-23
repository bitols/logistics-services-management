import { ISender } from '../models/entities/ISender';
import { ICreateSendersRequest } from '../models/requests/ICreateSendersRequest';

export interface ISendersRepository {
  create(data: ICreateSendersRequest): Promise<ISender>;
  save(sender: ISender): Promise<ISender>;
  remove(sender: ISender): Promise<void>;
  getById(id: string): Promise<ISender | undefined>;
  getAll(): Promise<ISender[]>;
}
