import { GetSenderInfoUseCase } from '@modules/senders/useCases/GetSendersInfoUseCase';
import { GetSendersProductsUseCase } from '@modules/senders/useCases/GetSendersProductsUseCase';
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

  public async getProductsById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    console.time('getProductsById');

    const { id } = request.params;

    const getSendersProducts = container.resolve(GetSendersProductsUseCase);
    const productsInfo = await getSendersProducts.execute({ id });

    console.timeEnd('getProductsById');

    return response.json(productsInfo);
  }
}
