import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetReceiversRequest } from '@shared-types/receivers/domain/models/requests/IGetReceiversRequest';
import { IReceiversResponse } from '@shared-types/receivers/domain/models/responses/IReceiversResponse';
import { IReceiversGateway } from '../domain/gateways/IReceiversGateway';
import { IGetReceiversUseCase } from '../domain/useCases/IGetReceiversUsecase';

@injectable()
export default class GetReceiversUseCase implements IGetReceiversUseCase {
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
