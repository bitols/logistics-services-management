import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';

import { IReceivers } from '../domain/models/responses/IReceivers';
import { IGetReceivers } from '../domain/models/requests/IGetReceivers';
import { IReceiversRepository } from '../domain/repositories/IReceiversRepository';
@injectable()
export default class GetReceiversUseCase {
  constructor(
    @inject('ReceiversRepository')
    private receiversRepository: IReceiversRepository,
  ) {}

  public async execute(data: IGetReceivers): Promise<IReceivers> {
    const receiver = await this.receiversRepository.getById(data);
    if (!receiver) {
      throw new AppErrors('Receiver not found');
    }

    return receiver;
  }
}
