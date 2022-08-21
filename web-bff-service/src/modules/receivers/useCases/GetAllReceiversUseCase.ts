import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IReceivers } from '../domain/models/responses/IReceivers';
import { IReceiversRepository } from '../domain/repositories/IReceiversRepository';

@injectable()
export default class GetAllReceiversUseCase {
  constructor(
    @inject('ReceiversRepository')
    private receiversRepository: IReceiversRepository,
  ) {}

  public async execute(): Promise<IReceivers[]> {
    const receivers = await this.receiversRepository.getAll();
    if (!receivers) {
      throw new AppErrors('Receivers not found');
    }

    return receivers;
  }
}
