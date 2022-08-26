import GetSendersUseCase from '@modules/senders/useCases/GetSendersUseCase';
import GetStoragesBySenderUsecase from '@modules/storages/useCases/GetStoragesBySenderUseCase';
import GetStoragesReportBySender from '@modules/reports/useCases/GetStoragesReportBySenderUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SendersController {
  public async getById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const getSenders = container.resolve(GetSendersUseCase);

    const sender = await getSenders.execute({ id });

    return response.json(sender);
  }

  public async getStorages(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const getSenders = container.resolve(GetSendersUseCase);
    const getStorages = container.resolve(GetStoragesBySenderUsecase);
    const getReports = container.resolve(GetStoragesReportBySender);

    const sender = await getSenders.execute({ id });
    const storages = await getStorages.execute({ senderId: sender.id });
    const capacityReports = await getReports.execute({ senderId: sender.id });

    return response.json(
      storages.map(storage => {
        return {
          id: storage.id,
          name: storage.name,
          capacity: storage.capacity,
          indicators: capacityReports
            ?.filter(capacity => capacity.storageId === storage.id)
            .map(indicator => {
              return {
                stored: indicator.stored,
                usage: indicator.usage,
                products: indicator.products,
                value: indicator.value,
              };
            })
            .reduce(
              (obj, item) => {
                obj = item;
                return obj;
              },
              {
                stored: 0,
                usage: 0,
                products: 0,
                value: 0,
              },
            ),
          location: storage.location,
        };
      }),
    );
  }
}
