import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetSenders } from '../domain/models/requests/IGetSenders';
import { ISenders } from '../domain/models/responses/ISenders';
import { ISendersRepository } from '../domain/repositories/ISendersRepository';
@injectable()
export default class GetSendersUseCase {
  constructor(
    @inject('SendersRepository')
    private sendersRepository: ISendersRepository,
  ) {}

  public async execute(data: IGetSenders): Promise<ISenders> {
    const sender = await this.sendersRepository.getById(data);
    if (!sender) {
      throw new AppErrors('Sender not found');
    }
    return sender;
  }
}
