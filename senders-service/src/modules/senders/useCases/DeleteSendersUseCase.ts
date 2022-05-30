import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IDeleteSendersRequest } from '@shared-types/senders/domain/models/requests/IDeleteSendersRequests';
import { ISendersRepository } from '../domain/repositories/ISendersRepository';
import { IDeleteSendersUseCase } from '../domain/useCases/IDeleteSendersUseCase';

@injectable()
export default class DeleteSendersUseCase implements IDeleteSendersUseCase {
  constructor(
    @inject('SendersRepository')
    private sendersRepository: ISendersRepository,
  ) {}

  public async execute(data: IDeleteSendersRequest): Promise<void> {
    const sender = await this.sendersRepository.getById(data.id);

    if (!sender) {
      throw new AppErrors('Sender not found');
    }

    await this.sendersRepository.remove(sender);
  }
}
