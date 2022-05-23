import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetSendersRequest } from '../domain/models/requests/IGetSendersRequest';
import { ISendersResponse } from '../domain/models/responses/ISendersResponse';
import { ISendersRepository } from '../domain/repositories/ISendersRepository';
import { IGetSendersUseCase } from '../domain/useCases/IGetSendersUseCase';

@injectable()
export default class GetSendersUseCase implements IGetSendersUseCase {
  constructor(
    @inject('SendersRepository')
    private sendersRepository: ISendersRepository,
  ) {}

  public async execute(data: IGetSendersRequest): Promise<ISendersResponse> {
    const sender = await this.sendersRepository.getById(data.id);
    if (!sender) {
      throw new AppErrors('Sender not found');
    }

    return sender as ISendersResponse;
  }
}
