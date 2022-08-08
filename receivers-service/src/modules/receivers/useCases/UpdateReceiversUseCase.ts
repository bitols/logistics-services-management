import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IReceiversRepository } from '../domain/repositories/IReceiverRepository';
import { IReceivers } from '../domain/models/responses/IReceivers';
import { IUpdateReceivers } from '../domain/models/requests/IUpdateReceivers';
import queue from '@config/queue';
import queueConfig from '@config/queue/config';
@injectable()
export default class UpdateReceiversUseCase {
  constructor(
    @inject('ReceiversRepository')
    private receiversRepository: IReceiversRepository,
  ) {}

  public async execute(data: IUpdateReceivers): Promise<IReceivers> {
    const receiver = await this.receiversRepository.getById(data.id);

    if (!receiver) {
      throw new AppErrors('Receiver not found');
    }
    const changedAddress = receiver.address !== data.address;

    receiver.name = data.name;
    receiver.email = data.email;
    receiver.address = data.address;
    receiver.phone = data.phone;

    await this.receiversRepository.save(receiver);

    if (changedAddress) {
      await queue.produce(
        queueConfig.receiverLocationTopic,
        JSON.stringify({
          id: receiver.id,
          address: receiver.address,
        }),
      );
    }

    return {
      id: receiver.id,
      name: receiver.name,
      email: receiver.email,
      phone: receiver.phone,
      address: receiver.address,
      location: receiver.location,
    };
  }
}
