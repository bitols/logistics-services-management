import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IReceiversRepository } from '../domain/repositories/IReceiverRepository';
import { IReceivers } from '../domain/models/responses/IReceivers';

@injectable()
export default class GetAllReceiversUseCase {
  constructor(
    @inject('ReceiversRepository')
    private receiversRepository: IReceiversRepository,
  ) {}

  public async execute(): Promise<IReceivers[]> {
    const receivers = await this.receiversRepository.getAll();
    if (!receivers.length) {
      throw new AppErrors('Receivers not found');
    }

    return receivers.map(receiver => {
      const dados: IReceivers = {
        id: receiver.id,
        name: receiver.name,
        email: receiver.email,
        phone: receiver.phone,
        address: receiver.address,
      };

      return dados;
    });
  }
}
