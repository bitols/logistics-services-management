import GetSendersUseCase from '@modules/senders/useCases/GetSendersUseCase';
import GetStoragesBySenderUsecase from '@modules/storages/useCases/GetStoragesBySenderUseCase';
import GetStoragesReportBySender from '@modules/reports/useCases/GetStoragesReportBySenderUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppErrors from '@shared/errors/AppErrors';
import GetProductsBySenderUseCase from '@modules/products/useCases/GetProductsBySenderUseCase';
import GetProductsByNameUseCase from '@modules/products/useCases/GetProductsByNameUseCase';

export default class SendersController {
  public async getById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const getSenders = container.resolve(GetSendersUseCase);

    const sender = await getSenders.execute({ id });

    if (request.credential.senderId !== sender.id) {
      throw new AppErrors('Unauthorized', 401);
    }

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

    if (request.credential.senderId !== sender.id) {
      throw new AppErrors('Unauthorized', 401);
    }

    return response.json(
      storages.map(storage => {
        return {
          id: storage.id,
          name: storage.name,
          capacity: storage.capacity,
          indicators: capacityReports
            ? capacityReports
                .filter(capacity => capacity.storageId === storage.id)
                .map(indicator => {
                  return {
                    stored: indicator.stored,
                    usage: indicator.usage,
                    products: indicator.products,
                    value: indicator.value,
                  };
                })
                .reduce(
                  (previousValue, currentValue) => {
                    previousValue = currentValue;
                    return previousValue;
                  },
                  {
                    stored: 0,
                    usage: 0,
                    products: 0,
                    value: 0,
                  },
                )
            : {
                stored: 0,
                usage: 0,
                products: 0,
                value: 0,
              },
          location: storage.location,
        };
      }),
    );
  }

  public async getProducts(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const name = request.query.name as string;

    if (name) {
      const getProductsByName = container.resolve(GetProductsByNameUseCase);

      const products = await getProductsByName.execute({
        senderId: id,
        name: name,
      });
      return response.json(products);
    }

    const getProducts = container.resolve(GetProductsBySenderUseCase);

    const products = await getProducts.execute({ senderId: id });

    return response.json(products);
  }
}
