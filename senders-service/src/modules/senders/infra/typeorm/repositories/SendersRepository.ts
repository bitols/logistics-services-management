import { ISender } from '@shared-types/senders/domain/models/entities/ISender';
import { ICreateSendersRequest } from '@shared-types/senders/domain/models/requests/ICreateSendersRequest';
import { ISendersRepository } from '@modules/senders/domain/repositories/ISendersRepository';
import { Repository } from 'typeorm';
import Supplier from '../entities/Sender';
import { dataSource } from '@shared/infra/typeorm';

export class SendersRepository implements ISendersRepository {
  private ormRepository: Repository<Supplier>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Supplier);
  }

  public async create(data: ICreateSendersRequest): Promise<ISender> {
    console.log(`create sender: ${JSON.stringify(data)}`);

    const sender = this.ormRepository.create(data);

    return sender;
  }

  public async save(sender: ISender): Promise<ISender> {
    console.log(`save sender: ${JSON.stringify(sender)}`);

    await this.ormRepository.save(sender);

    return sender;
  }

  public async remove(sender: ISender): Promise<void> {
    console.log(`remove sender: ${JSON.stringify(sender)}`);

    await this.ormRepository.remove(sender);
  }

  public async getById(id: string): Promise<ISender | null | undefined> {
    console.log(`get sender by id: ${id}`);

    const sender = await this.ormRepository.findOneById(id);

    return sender;
  }

  public async getAll(): Promise<ISender[]> {
    console.log(`get all senders`);

    const senders = await this.ormRepository.find();

    return senders;
  }
}
