import CreateSessionsUseCase from '@modules/users/useCases/CreateSessionsUseCase';
import { Request, Response } from 'express';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = new CreateSessionsUseCase();

    const user = await createSession.execute({ email, password });

    return response.json(user);
  }
}
