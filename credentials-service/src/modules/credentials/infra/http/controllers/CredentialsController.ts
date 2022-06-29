import CreateCredentialsUseCase from '@modules/credentials/useCases/CreateCredentialsUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CredentialsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password, senderId } = request.body;

    const createCredentials = container.resolve(CreateCredentialsUseCase);

    const credentials = await createCredentials.execute({
      email,
      password,
      senderId,
    });

    return response.json(credentials);
  }
}
