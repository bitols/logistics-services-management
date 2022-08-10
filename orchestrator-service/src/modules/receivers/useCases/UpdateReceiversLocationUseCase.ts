import { inject, injectable } from 'tsyringe';
import { IReceiversRepository } from '../domain/repositories/IReceiversRepository';
import { IUpdateReceiversLocation } from '../domain/models/requests/IUpdateReceiversLocation';

@injectable()
export class UpdateReceiversLocationUseCase {
  constructor(
    @inject('ReceiversRepository')
    private receiversRepository: IReceiversRepository,
  ) {}

  public async execute(request: IUpdateReceiversLocation): Promise<void> {
    await this.receiversRepository.updateLocation(request);
  }
}
