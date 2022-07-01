import { IReceiver } from '@shared-types/receivers/domain/models/entities/IReceiver';
import { ICreateReceiversRequest } from '@shared-types/receivers/domain/models/requests/ICreateReceiversRequest';
import { IReceiversRepository } from '@modules/receivers/domain/repositories/IReceiverRepository';
import { Repository } from 'typeorm';
import Receiver from '../entities/Receiver';
import { dataSource } from '@shared/infra/orm';
export class ReceiversRepository implements IReceiversRepository {
  private ormRepository: Repository<Receiver>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Receiver);
  }

  public async create(data: ICreateReceiversRequest): Promise<IReceiver> {
    const receiver = this.ormRepository.create(data);

    return receiver;
  }

  public async save(receiver: IReceiver): Promise<IReceiver> {
    await this.ormRepository.save(receiver);

    return receiver;
  }

  public async remove(receiver: IReceiver): Promise<void> {
    await this.ormRepository.remove(receiver);
  }

  public async getById(id: string): Promise<IReceiver | null | undefined> {
    const receiver = await this.ormRepository.findOneById(id);

    return receiver;
  }

  public async getAll(): Promise<IReceiver[]> {
    const receivers = await this.ormRepository.find();

    return receivers;
  }
}
