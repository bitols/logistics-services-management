import { GetSenderInfoUseCase } from '@modules/senders/useCases/GetSendersInfoUseCase';
import { GetSendersStoragesInfoUseCase } from '@modules/senders/useCases/GetSendersStoragesInfoUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SendersController {
  public async getInfoById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const getSendersInfo = container.resolve(GetSenderInfoUseCase);
    const info = await getSendersInfo.execute({ id });

    return response.json(info);
  }

  public async getStoragesControlById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const getSendersStorages = container.resolve(GetSendersStoragesInfoUseCase);
    const productsInfo = await getSendersStorages.execute({ id });

    return response.json(productsInfo);
  }
}
