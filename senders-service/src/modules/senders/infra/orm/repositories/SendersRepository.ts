import { ISendersRepository } from '@modules/senders/domain/repositories/ISendersRepository';
import Supplier from '../entities/Sender';
import { dataSource } from '@config/orm';
import { ICreateSenders } from '@modules/senders/domain/models/requests/ICreateSenders';
import { ISender } from '@modules/senders/domain/models/entities/ISender';

export class SendersRepository implements ISendersRepository {
  private ormRepository;
  constructor() {
    this.ormRepository = dataSource.getRepository(Supplier);
  }

  public async create(data: ICreateSenders): Promise<ISender> {
    const sender = this.ormRepository.create(data);

    return sender;
  }

  public async save(sender: ISender): Promise<ISender> {
    await this.ormRepository.save(sender);

    return sender;
  }

  public async remove(sender: ISender): Promise<void> {
    await this.ormRepository.remove(sender);
  }

  public async getById(id: string): Promise<ISender | null | undefined> {
    const sender = await this.ormRepository.findOneById(id);

    return sender;
  }

  public async getAll(): Promise<ISender[]> {
    const senders = await this.ormRepository.find();

    return senders;
  }
}
