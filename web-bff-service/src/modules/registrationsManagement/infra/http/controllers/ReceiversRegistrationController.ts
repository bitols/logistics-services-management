import GetReceiverInfosUseCase from '@modules/registrationsManagement/useCases/GetReceiversInfoUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ReceiversController {
  public async getInfoById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const getReceiversInfo = container.resolve(GetReceiverInfosUseCase);
    const receiver = await getReceiversInfo.execute({ id });

    return response.json(receiver);
  }
}
