import GetAllStoragesCapacityBySenderIdUseCase from '@modules/reports/useCases/GetAllStoragesCapacityBySenderIdUseCase';
import RegisterStoragesCapacityUseCase from '@modules/reports/useCases/RegisterStoragesCapacityUseCase';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class ReportsController {
  public async getSendersStoragesCapacity(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { senderId } = request.params;

    const getAllStoragesCapacityBySender = container.resolve(
      GetAllStoragesCapacityBySenderIdUseCase,
    );
    const storagesCapacity = await getAllStoragesCapacityBySender.execute({
      senderId,
    });
    return response.json(storagesCapacity);
  }

  public async RegisterSendersStoragesCapacity(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { storageId, capacity, stored, usage, products, value, senderId } =
      request.body;

    const registerStoragesCapacity = container.resolve(
      RegisterStoragesCapacityUseCase,
    );
    const storageCapacity = await registerStoragesCapacity.execute({
      storageId,
      capacity,
      stored,
      usage,
      products,
      value,
      senderId,
    });

    return response.json(storageCapacity);
  }
}
