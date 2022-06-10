import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetReceiversRequest } from '@shared-types/receivers/domain/models/requests/IGetReceiversRequest';
import { IReceiversResponse } from '@shared-types/receivers/domain/models/responses/IReceiversResponse';
import { IReceiversGateway } from '@modules/receivers/domain/gateways/IReceiversGateway';
import { IGetReceiversInfoUseCase } from '../domain/useCases/IGetReceiversInfoUseCase';

@injectable()
export default class GetReceiverInfosUseCase
  implements IGetReceiversInfoUseCase
{
  constructor(
    @inject('ReceiversGateway')
    private receiversGateway: IReceiversGateway,
  ) {}

  public async execute(
    data: IGetReceiversRequest,
  ): Promise<IReceiversResponse> {
    const receiver = await this.receiversGateway.getById(data);

    if (!receiver) {
      throw new AppErrors('Receiver not found');
    }
    return receiver;
  }
}
