import { GetStoragesCapacityBySenderUseCase } from '@modules/strategiesManagement/useCases/GetStoragesCapacityBySenderUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SendersStrastegyController {
  public async getStoragesCapacityBySender(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const getStoragesCapacity = container.resolve(
      GetStoragesCapacityBySenderUseCase,
    );
    const productsInfo = await getStoragesCapacity.execute({ id });

    return response.json(productsInfo);
  }
}
