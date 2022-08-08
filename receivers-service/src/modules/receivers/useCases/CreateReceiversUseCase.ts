import { inject, injectable } from 'tsyringe';
import { IReceivers } from '@modules/receivers/domain/models/responses/IReceivers';
import { IReceiversRepository } from '../domain/repositories/IReceiverRepository';
import { ICreateReceivers } from '../domain/models/requests/ICreateReceivers';
import queue from '@config/queue';
import queueConfig from '@config/queue/config';

@injectable()
export default class CreateReceiversUseCase {
  constructor(
    @inject('ReceiversRepository')
    private receiversRepository: IReceiversRepository,
  ) {}

  public async execute(data: ICreateReceivers): Promise<IReceivers> {
    const receiver = await this.receiversRepository.create(data);

    await this.receiversRepository.save(receiver);
    await queue.produce(
      queueConfig.receiverLocationTopic,
      JSON.stringify({
        id: receiver.id,
        address: receiver.address,
      }),
    );
    return {
      id: receiver.id,
      name: receiver.name,
      email: receiver.email,
      phone: receiver.phone,
      address: receiver.address,
    };
  }
}
