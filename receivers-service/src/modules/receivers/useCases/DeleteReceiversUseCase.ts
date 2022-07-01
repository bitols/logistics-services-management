import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IDeleteReceivers } from '../domain/models/requests/IDeleteReceivers';
import { IReceiversRepository } from '../domain/repositories/IReceiverRepository';

@injectable()
export default class DeleteReceiversUseCase {
  constructor(
    @inject('ReceiversRepository')
    private receiversRepository: IReceiversRepository,
  ) {}

  public async execute(data: IDeleteReceivers): Promise<void> {
    const receiver = await this.receiversRepository.getById(data.id);

    if (!receiver) {
      throw new AppErrors('Receiver not found');
    }

    await this.receiversRepository.remove(receiver);
  }
}
