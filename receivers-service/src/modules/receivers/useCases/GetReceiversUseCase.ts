import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetReceiversRequest } from '../domain/models/requests/IGetReceiversRequest';
import { IReceiversResponse } from '../domain/models/responses/IReceiversResponse';
import { IReceiversRepository } from '../domain/repositories/IReceiverRepository';
import { IGetReceiversUseCase } from '../domain/useCases/IGetReceiversUseCase';

@injectable()
export default class GetReceiversUseCase implements IGetReceiversUseCase {
  constructor(
    @inject('ReceiversRepository')
    private receiversRepository: IReceiversRepository,
  ) {}

  public async execute(
    data: IGetReceiversRequest,
  ): Promise<IReceiversResponse> {
    const receiver = await this.receiversRepository.getById(data.id);
    if (!receiver) {
      throw new AppErrors('Receiver not found');
    }

    return receiver as IReceiversResponse;
  }
}
