import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IUpdateSenders } from '../domain/models/requests/IUpdateSenders';
import { ISendersResponse } from '../domain/models/responses/ISenders';
import { ISendersRepository } from '../domain/repositories/ISendersRepository';
@injectable()
export default class UpdateSendersUseCase {
  constructor(
    @inject('SendersRepository')
    private sendersRepository: ISendersRepository,
  ) {}

  public async execute(data: IUpdateSenders): Promise<ISendersResponse> {
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
