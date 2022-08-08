import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IReceiversRepository } from '../domain/repositories/IReceiverRepository';
import { IReceivers } from '../domain/models/responses/IReceivers';
import { IGetReceivers } from '../domain/models/requests/IGetReceivers';
@injectable()
export default class GetReceiversUseCase {
  constructor(
    @inject('ReceiversRepository')
    private receiversRepository: IReceiversRepository,
  ) {}

  public async execute(data: IGetReceivers): Promise<IReceivers> {
    const receiver = await this.receiversRepository.getById(data.id);
    if (!receiver) {
      throw new AppErrors('Receiver not found');
    }

    console.log(receiver);

    return {
      id: receiver.id,
      name: receiver.name,
      email: receiver.email,
      address: receiver.address,
      phone: receiver.phone,
      location: receiver.location,
    };
  }
}
