import { inject, injectable } from 'tsyringe';
import { ICreateSendersRequest } from '@shared-types/senders/domain/models/requests/ICreateSendersRequest';
import { ISendersResponse } from '@shared-types/senders/domain/models/responses/ISendersResponse';
import { ISendersRepository } from '../domain/repositories/ISendersRepository';
import { ICreateSendersUseCase } from '../domain/useCases/ICreateSendersUseCase';

@injectable()
export default class CreateSendersUseCase implements ICreateSendersUseCase {
  constructor(
    @inject('SendersRepository')
    private sendersRepository: ISendersRepository,
  ) {}

  public async execute(data: ICreateSendersRequest): Promise<ISendersResponse> {
    const sender = await this.sendersRepository.create(data);

    await this.sendersRepository.save(sender);

    return sender as ISendersResponse;
  }
}
