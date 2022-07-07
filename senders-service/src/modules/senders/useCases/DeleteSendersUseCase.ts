import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IDeleteSenders } from '../domain/models/requests/IDeleteSenders';
import { ISendersRepository } from '../domain/repositories/ISendersRepository';

@injectable()
export default class DeleteSendersUseCase {
  constructor(
    @inject('SendersRepository')
    private sendersRepository: ISendersRepository,
  ) {}

  public async execute(data: IDeleteSenders): Promise<void> {
    const sender = await this.sendersRepository.getById(data.id);

    if (!sender) {
      throw new AppErrors('Sender not found');
    }

    await this.sendersRepository.remove(sender);
  }
}
