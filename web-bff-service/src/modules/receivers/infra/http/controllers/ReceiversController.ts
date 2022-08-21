import GetAllReceiversUseCase from '@modules/receivers/useCases/GetAllReceiversUseCase';
import GetReceiversUseCase from '@modules/receivers/useCases/GetReceiversUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ReceiversController {
  public async getById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const getReceivers = container.resolve(GetReceiversUseCase);
    const receiver = await getReceivers.execute({ id });

    return response.json(receiver);
  }

  public async getAll(request: Request, response: Response): Promise<Response> {
    const getAllReceivers = container.resolve(GetAllReceiversUseCase);
    const receivers = await getAllReceivers.execute();

    return response.json(receivers);
  }
}
