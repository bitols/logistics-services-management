import { IGetSendersRequest } from '@shared-types/senders/domain/models/requests/IGetSendersRequest';
import { IGetStoragesCapacityBySenderUseCase } from '../domain/useCases/IGetStoragesCapacityBySenderUseCase';
import { IReportsRepository } from '@modules/reports/domain/repositories/IReportsRepository';
import { IStoragesRepository } from '@modules/storages/domain/repositories/IStoragesRepository';
import { inject, injectable } from 'tsyringe';
import AppErrors from '@shared/errors/AppErrors';

@injectable()
export class GetStoragesCapacityBySenderUseCase
  implements IGetStoragesCapacityBySenderUseCase
{
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
    @inject('ReportsRepository')
    private reportsRepository: IReportsRepository,
  ) {}

  public async execute(data: IGetSendersRequest): Promise<any> {
    const storages = await this.storagesRepository.getAllBySender({
      senderId: data.id,
    });

    if (!storages) {
      throw new AppErrors('Storages not found');
    }

    const capacityReports =
      await this.reportsRepository.getAllStoragesCapacityBySender({
        senderId: data.id,
      });

    return storages.map(storage => {
      return {
        id: storage.id,
        name: storage.name,
        email: storage.email,
        phone: storage.phone,
        address: storage.address,
        location: storage.location,
        indicators: capacityReports
          ?.filter(capacity => capacity.storageId === storage.id)
          .map(indicator => {
            return {
              capacity: indicator.capacity,
              stored: indicator.stored,
              usage: indicator.usage,
              products: indicator.products,
              value: indicator.value,
            };
          })
          .reduce(capacityindicator => capacityindicator),
      };
    });
  }
}
