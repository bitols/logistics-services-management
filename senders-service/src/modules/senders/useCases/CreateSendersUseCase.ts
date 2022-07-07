import { inject, injectable } from 'tsyringe';
import { ICreateSenders } from '../domain/models/requests/ICreateSenders';
import { ISendersResponse } from '../domain/models/responses/ISenders';
import { ISendersRepository } from '../domain/repositories/ISendersRepository';

@injectable()
export default class CreateSendersUseCase {
  constructor(
    @inject('SendersRepository')
    private sendersRepository: ISendersRepository,
  ) {}

  public async execute(data: ICreateSenders): Promise<ISendersResponse> {
    const sender = await this.sendersRepository.create(data);

    await this.sendersRepository.save(sender);

    return sender as ISendersResponse;
  }
}
