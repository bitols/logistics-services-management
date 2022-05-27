import CreateReceiversUseCase from '@modules/receivers/useCases/CreateReceiversUseCase';
import DeleteReceiversUseCase from '@modules/receivers/useCases/DeleteReceiversUseCase';
import GetAllReceiversUseCase from '@modules/receivers/useCases/GetAllReceiversUseCase';
import GetReceiversUseCase from '@modules/receivers/useCases/GetReceiversUseCase';
import UpdateReceiversUseCase from '@modules/receivers/useCases/UpdateReceiversUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ReceiversController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const getAllReceivers = container.resolve(GetAllReceiversUseCase);
    const receivers = await getAllReceivers.execute();

    return response.json(receivers);
  }

  public async getById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const getReceivers = container.resolve(GetReceiversUseCase);
    const receiver = await getReceivers.execute({ id });

    return response.json(receiver);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, phone, address } = request.body;

    const createReceivers = container.resolve(CreateReceiversUseCase);
    const receiver = await createReceivers.execute({
      name,
      email,
      phone,
      address,
    });

    return response.json(receiver);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, phone, address } = request.body;

    const updateReceivers = container.resolve(UpdateReceiversUseCase);
    const receiver = await updateReceivers.execute({
      id,
      name,
      email,
      phone,
      address,
    });

    return response.json(receiver);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteReceivers = container.resolve(DeleteReceiversUseCase);
    await deleteReceivers.execute({ id });

    return response.json({});
  }
}
