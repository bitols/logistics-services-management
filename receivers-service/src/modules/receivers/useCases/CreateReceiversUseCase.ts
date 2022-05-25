import { inject, injectable } from 'tsyringe';
import { ICreateReceiversRequest } from '../domain/models/requests/ICreateReceiversRequest';
import { IReceiversResponse } from '../domain/models/responses/IReceiversResponse';
import { IReceiversRepository } from '../domain/repositories/IReceiverRepository';
import { ICreateReceiversUseCase } from '../domain/useCases/ICreateReceiversUseCase';

@injectable()
export default class CreateReceiversUseCase implements ICreateReceiversUseCase {
  constructor(
    @inject('ReceiversRepository')
    private receiversRepository: IReceiversRepository,
  ) {}

  public async execute(
    data: ICreateReceiversRequest,
  ): Promise<IReceiversResponse> {
    const receiver = await this.receiversRepository.create(data);

    await this.receiversRepository.save(receiver);

    return receiver as IReceiversResponse;
  }
}
