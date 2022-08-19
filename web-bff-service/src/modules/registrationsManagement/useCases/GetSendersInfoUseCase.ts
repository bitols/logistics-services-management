import { IGetSendersRequest } from '@shared-types/senders/domain/models/requests/IGetSendersRequest';
import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { ISendersRepository } from '@modules/senders/domain/repositories/ISendersRepository';
import { IGetSendersInfoUseCase } from '../domain/useCases/IGetSendersInfoUseCase';

@injectable()
export class GetSenderInfoUseCase implements IGetSendersInfoUseCase {
  constructor(
    @inject('SendersGateway')
    private sendersGateway: ISendersRepository,
  ) {}

  public async execute(data: IGetSendersRequest): Promise<any> {
    const sender = await this.sendersGateway.getById(data);
    if (!sender) {
      throw new AppErrors('Sender not found');
    }

    return {
      id: sender.id,
      name: sender.name,
      email: sender.email,
      phone: sender.phone,
    };
  }
}
