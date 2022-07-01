import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IReceiversRepository } from '../domain/repositories/IReceiverRepository';
import { IReceivers } from '../domain/models/responses/IReceivers';
import { IUpdateReceivers } from '../domain/models/requests/IUpdateReceivers';
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

    receiver.name = data.name;
    receiver.email = data.email;
    receiver.address = data.address;
    receiver.phone = data.phone;

    await this.receiversRepository.save(receiver);

    return {
      id: receiver.id,
      name: receiver.name,
      email: receiver.email,
      phone: receiver.phone,
      address: receiver.address,
    };
  }
}
