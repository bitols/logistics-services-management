import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { ISenders } from '../domain/models/responses/ISenders';
import { ISendersRepository } from '../domain/repositories/ISendersRepository';
@injectable()
export default class GetAllSendersUseCase {
  constructor(
    @inject('SendersRepository')
    private sendersRepository: ISendersRepository,
  ) {}

  public async execute(): Promise<ISenders[]> {
    const senders = await this.sendersRepository.getAll();
    if (!senders) {
      throw new AppErrors('Senders not found');
    }

    return senders;
  }
}
