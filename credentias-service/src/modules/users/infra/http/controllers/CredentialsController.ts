import CreateCredentialsUseCase from '@modules/users/useCases/CreateCredentialsUseCase';
import { Request, Response } from 'express';

export default class CredentialsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password, senderId } = request.body;

    const createUser = new CreateCredentialsUseCase();

    const user = await createUser.execute({
      email,
      password,
      senderId,
    });

    return response.json(user);
  }
}
