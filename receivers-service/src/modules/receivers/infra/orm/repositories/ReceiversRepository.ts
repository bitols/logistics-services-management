import { IReceiver } from '@modules/receivers/domain/models/entities/IReceiver';
import { IReceiversRepository } from '@modules/receivers/domain/repositories/IReceiverRepository';
import Receiver from '../entities/Receiver';
import { dataSource } from '@config/orm';
import { ICreateReceivers } from '@modules/receivers/domain/models/requests/ICreateReceivers';
export class ReceiversRepository implements IReceiversRepository {
  private ormRepository;
  constructor() {
    this.ormRepository = dataSource.getRepository(Receiver);
  }

  public async create(data: ICreateReceivers): Promise<IReceiver> {
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
