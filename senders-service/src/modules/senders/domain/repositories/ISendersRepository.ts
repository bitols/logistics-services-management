import { ISender } from '../models/entities/ISender';
import { ICreateSenders } from '../models/requests/ICreateSenders';

export interface ISendersRepository {
  create(data: ICreateSenders): Promise<ISender>;
  save(sender: ISender): Promise<ISender>;
  remove(sender: ISender): Promise<void>;
  getById(id: string): Promise<ISender | null | undefined>;
  getAll(): Promise<ISender[]>;
}
