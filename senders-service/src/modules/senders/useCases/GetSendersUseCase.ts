import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetSenders } from '../domain/models/requests/IGetSenders';
import { ISendersResponse } from '../domain/models/responses/ISenders';
import { ISendersRepository } from '../domain/repositories/ISendersRepository';
@injectable()
export default class GetSendersUseCase {
  constructor(
    @inject('SendersRepository')
    private sendersRepository: ISendersRepository,
  ) {}

  public async execute(data: IGetSenders): Promise<ISendersResponse> {
    const sender = await this.sendersRepository.getById(data.id);
    if (!sender) {
      throw new AppErrors('Sender not found');
    }

    return sender as ISendersResponse;
  }
}
