import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IReceiversResponse } from '@shared-types/receivers/domain/models/responses/IReceiversResponse';
import { IReceiversRepository } from '../domain/repositories/IReceiverRepository';
import { IGetAllReceiversUseCase } from '../domain/useCases/IGetAllReceiversUseCase';

@injectable()
export default class GetAllReceiversUseCase implements IGetAllReceiversUseCase {
  constructor(
    @inject('ReceiversRepository')
    private receiversRepository: IReceiversRepository,
  ) {}

  public async execute(): Promise<IReceiversResponse[]> {
    const receivers = await this.receiversRepository.getAll();
    if (!receivers.length) {
      throw new AppErrors('Receivers not found');
    }

    return receivers.map(receiver => receiver as IReceiversResponse);
  }
}
