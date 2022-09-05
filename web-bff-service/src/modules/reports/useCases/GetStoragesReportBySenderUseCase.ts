import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetStoragesCapacityBySender } from '../domain/models/requests/IGetStoragesCapacityBySender';
import { IStoragesCapacity } from '../domain/models/responses/IStoragesCapacity';
import { IReportsRepository } from '../domain/repositories/IReportsRepository';

@injectable()
export default class GetStoragesReportBySender {
  constructor(
    @inject('ReportsRepository')
    private reportsRepository: IReportsRepository,
  ) {}

  public async execute(
    data: IGetStoragesCapacityBySender,
  ): Promise<IStoragesCapacity[]> {
    const report = await this.reportsRepository.getAllStoragesCapacityBySender(
      data,
    );
    return report as IStoragesCapacity[];
  }
}
