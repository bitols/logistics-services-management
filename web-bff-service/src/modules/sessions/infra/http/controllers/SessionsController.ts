import { CreateSessionsUseCase } from '@modules/sessions/useCases/CreateSessonsUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
export default class SessionsConytoller {
  public async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = container.resolve(CreateSessionsUseCase);

    const session = await createSession.execute({ email, password });

    return response.json(session);
  }
}
