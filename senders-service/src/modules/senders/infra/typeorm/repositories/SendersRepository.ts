import { ISender } from '@shared-types/senders/domain/models/entities/ISender';
import { ICreateSendersRequest } from '@shared-types/senders/domain/models/requests/ICreateSendersRequest';
import { ISendersRepository } from '@modules/senders/domain/repositories/ISendersRepository';
import { getRepository, Repository } from 'typeorm';
import Supplier from '../entities/Sender';

export class SendersRepository implements ISendersRepository {
  private ormRepository: Repository<Supplier>;

  constructor() {
    this.ormRepository = getRepository(Supplier);
  }

  public async create(data: ICreateSendersRequest): Promise<ISender> {
    const supplier = this.ormRepository.create(data);

    return supplier;
  }

  public async save(sender: ISender): Promise<ISender> {
    await this.ormRepository.save(sender);

    return sender;
  }

  public async remove(sender: ISender): Promise<void> {
    await this.ormRepository.remove(sender);
  }

  public async getById(id: string): Promise<ISender | undefined> {
    const sender = await this.ormRepository.findOne(id);

    return sender;
  }

  public async getAll(): Promise<ISender[]> {
    const suppliers = await this.ormRepository.find();

    return suppliers;
  }
}
