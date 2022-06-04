import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IUpdateSendersRequest } from '@shared-types/senders/domain/models/requests/IUpdateSendersRequest';
import { ISendersResponse } from '@shared-types/senders/domain/models/responses/ISendersResponse';
import { ISendersRepository } from '../domain/repositories/ISendersRepository';
import { IUpdateSendersUseCase } from '../domain/useCases/IUpdateSendersUseCase';

@injectable()
export default class UpdateSendersUseCase implements IUpdateSendersUseCase {
  constructor(
    @inject('SendersRepository')
    private sendersRepository: ISendersRepository,
  ) {}

  public async execute(data: IUpdateSendersRequest): Promise<ISendersResponse> {
    const sender = await this.sendersRepository.getById(data.id);

    if (!sender) {
      throw new AppErrors('Sender not found');
    }

    sender.name = data.name;
    sender.email = data.email;
    sender.phone = data.phone;

    await this.sendersRepository.save(sender);

    return sender as ISendersResponse;
  }
}
