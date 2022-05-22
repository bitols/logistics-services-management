import { Router } from 'express';
import sendersRouter from '@modules/senders/infra/http/routes/senders.routes';

const routes = Router();

routes.use('/senders', sendersRouter);

export default routes;
