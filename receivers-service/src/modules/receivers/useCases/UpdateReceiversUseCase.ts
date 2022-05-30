import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IUpdateReceiversrequest } from '@shared-types/receivers/domain/models/requests/IUpdateReceiversRequest';
import { IReceiversResponse } from '@shared-types/receivers/domain/models/responses/IReceiversResponse';
import { IReceiversRepository } from '../domain/repositories/IReceiverRepository';
import { IUpdateReceiversUseCase } from '../domain/useCases/IUpdateReceiversUseCase';

@injectable()
export default class UpdateReceiversUseCase implements IUpdateReceiversUseCase {
  constructor(
    @inject('ReceiversRepository')
    private receiversRepository: IReceiversRepository,
  ) {}

  public async execute(
    data: IUpdateReceiversrequest,
  ): Promise<IReceiversResponse> {
    const receiver = await this.receiversRepository.getById(data.id);

    if (!receiver) {
      throw new AppErrors('Receiver not found');
    }

    receiver.name = data.name;
    receiver.email = data.email;
    receiver.address = data.address;
    receiver.phone = data.phone;

    await this.receiversRepository.save(receiver);

    return receiver as IReceiversResponse;
  }
}
