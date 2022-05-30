import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IDeleteReceiversRequest } from '@shared-types/receivers/domain/models/requests/IDeleteReceiversRequest';
import { IReceiversRepository } from '../domain/repositories/IReceiverRepository';
import { IDeleteReceiversUseCase } from '../domain/useCases/IDeleteReceiversUseCase';

@injectable()
export default class DeleteReceiversUseCase implements IDeleteReceiversUseCase {
  constructor(
    @inject('ReceiversRepository')
    private receiversRepository: IReceiversRepository,
  ) {}

  public async execute(data: IDeleteReceiversRequest): Promise<void> {
    const receiver = await this.receiversRepository.getById(data.id);

    if (!receiver) {
      throw new AppErrors('Receiver not found');
    }

    await this.receiversRepository.remove(receiver);
  }
}
