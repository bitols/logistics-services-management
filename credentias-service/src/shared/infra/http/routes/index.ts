import credentialsRouter from '@modules/credentials/infra/http/routes/credentials.routes';
import sessionsRouter from '@modules/credentials/infra/http/routes/sessions.routes';
import { Request, Response, Router } from 'express';
const routes = Router();

routes.get('/health', async (req: Request, res: Response) => {
  return res.json({ status: 'UP' });
});

routes.use('/credentials', credentialsRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
