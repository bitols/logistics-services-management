import CreateSendersUseCase from '@modules/senders/useCases/CreateSendersUseCase';
import DeleteSendersUseCase from '@modules/senders/useCases/DeleteSendersUseCase';
import GetAllSendersUseCase from '@modules/senders/useCases/GetAllSendersUseCase';
import GetSendersUseCase from '@modules/senders/useCases/GetSendersUseCase';
import UpdateSendersUseCase from '@modules/senders/useCases/UpdateSendersUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SuppliersController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const getAllSenders = container.resolve(GetAllSendersUseCase);
    const senders = await getAllSenders.execute();

    return response.json(senders);
  }

  public async getById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const getSenders = container.resolve(GetSendersUseCase);
    const sender = await getSenders.execute({ id });

    return response.json(sender);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, phone } = request.body;

    const createSenders = container.resolve(CreateSendersUseCase);
    const sender = await createSenders.execute({
      name,
      email,
      phone,
    });

    return response.json(sender);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, phone } = request.body;

    const updateSenders = container.resolve(UpdateSendersUseCase);
    const sender = await updateSenders.execute({
      id,
      name,
      email,
      phone,
    });

    return response.json(sender);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteSender = container.resolve(DeleteSendersUseCase);
    await deleteSender.execute({ id });

    return response.json({});
  }
}
