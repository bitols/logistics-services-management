import { IGetSendersRequest } from '@shared-types/senders/domain/models/requests/IGetSendersRequest';
import { IGetStoragesCapacityBySenderUseCase } from '../domain/useCases/IGetStoragesCapacityBySenderUseCase';
import { IReportsGateway } from '@modules/reports/domain/gateways/IReportsGateway';
import { IStoragesGateway } from '@modules/storages/domain/gateways/IStoragesGateway';
import { inject, injectable } from 'tsyringe';
import AppErrors from '@shared/errors/AppErrors';

@injectable()
export class GetStoragesCapacityBySenderUseCase
  implements IGetStoragesCapacityBySenderUseCase
{
  constructor(
    @inject('StoragesGateway')
    private storagesGateway: IStoragesGateway,
    @inject('ReportsGateway')
    private reportsGateway: IReportsGateway,
  ) {}

  public async execute(data: IGetSendersRequest): Promise<any> {
    const storages = await this.storagesGateway.getAllBySender({
      senderId: data.id,
    });

    if (!storages) {
      throw new AppErrors('Storages not found');
    }

    const capacityReports =
      await this.reportsGateway.getAllStoragesCapacityBySender({
        senderId: data.id,
      });

    return storages.map(storage => {
      return {
        id: storage.id,
        name: storage.name,
        email: storage.email,
        phone: storage.phone,
        address: storage.address,
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
          .reduce(capacityindicator => {
            return capacityindicator;
          }),
      };
    });
  }
}
