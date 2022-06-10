import { GetSenderInfoUseCase } from '@modules/registrationsManagement/useCases/GetSendersInfoUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SendersRegistrationController {
  public async getInfoById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const getSendersInfo = container.resolve(GetSenderInfoUseCase);
    const info = await getSendersInfo.execute({ id });

    return response.json(info);
  }
}
