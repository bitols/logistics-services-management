import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IUpdateReceiversLocation } from '../domain/models/requests/IUpdateReceiversLocation';
import { IReceivers } from '../domain/models/responses/IReceivers';
import { IReceiversRepository } from '../domain/repositories/IReceiverRepository';
@injectable()
export class UpdateLocationUseCase {
  constructor(
    @inject('ReceiversRepository')
    private receiversRepository: IReceiversRepository,
  ) {}

  public async execute(data: IUpdateReceiversLocation): Promise<IReceivers> {
    const receiver = await this.receiversRepository.getById(data.id);

    if (!receiver) {
      throw new AppErrors('Receiver not found');
    }

    receiver.location = data.location;

    await this.receiversRepository.save(receiver);

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
