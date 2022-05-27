import { IReceiver } from '@modules/receivers/domain/models/entities/IReceiver';
import { ICreateReceiversRequest } from '@modules/receivers/domain/models/requests/ICreateReceiversRequest';
import { IReceiversRepository } from '@modules/receivers/domain/repositories/IReceiverRepository';
import { getRepository, Repository } from 'typeorm';
import Receiver from '../entities/Receiver';

export class ReceiversRepository implements IReceiversRepository {
  private ormRepository: Repository<Receiver>;

  constructor() {
    this.ormRepository = getRepository(Receiver);
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

  public async getById(id: string): Promise<IReceiver | undefined> {
    const receiver = await this.ormRepository.findOne(id);

    return receiver;
  }

  public async getAll(): Promise<IReceiver[]> {
    const receivers = await this.ormRepository.find();

    return receivers;
  }
}
