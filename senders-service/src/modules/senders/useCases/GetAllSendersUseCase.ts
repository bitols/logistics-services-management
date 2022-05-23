import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { ISendersResponse } from '../domain/models/responses/ISendersResponse';
import { ISendersRepository } from '../domain/repositories/ISendersRepository';
import { IGetAllSendersUseCase } from '../domain/useCases/IGetAllSendersUseCase';

@injectable()
export default class GetAllSendersUseCase implements IGetAllSendersUseCase {
  constructor(
    @inject('SendersRepository')
    private sendersRepository: ISendersRepository,
  ) {}

  public async execute(): Promise<ISendersResponse[]> {
    const senders = await this.sendersRepository.getAll();
    if (!senders.length) {
      throw new AppErrors('Senders not found');
    }

    return senders.map(sender => sender as ISendersResponse);
  }
}
