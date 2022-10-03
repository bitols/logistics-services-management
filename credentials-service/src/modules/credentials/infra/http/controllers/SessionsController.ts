import CreateSessionsUseCase from '@modules/credentials/useCases/CreateSessionsUseCase';
import ValidationSessionsUseCase from '@modules/credentials/useCases/ValidationSessionsUseCase';
import AppErrors from '@shared/errors/AppErrors';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = container.resolve(CreateSessionsUseCase);

    const auth = await createSession.execute({ email, password });
    return response.json(auth);
  }

  public async validation(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { token } = request.body;

    console.log(request.body);

    const validationSession = container.resolve(ValidationSessionsUseCase);

    const session = await validationSession.execute({ token });

    return response.json(session);
  }
}
