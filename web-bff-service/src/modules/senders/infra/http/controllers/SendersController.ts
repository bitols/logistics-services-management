import { GetSenderInfoUseCase } from '@modules/senders/useCases/GetSendersInfoUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SendersController {
  public async getById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const getSendersInfo = container.resolve(GetSenderInfoUseCase);
    const info = await getSendersInfo.execute({ id });

    return response.json(info);
  }
}
