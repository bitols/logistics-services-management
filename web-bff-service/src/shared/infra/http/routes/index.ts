import receiversRouter from '@modules/receivers/infra/http/routes/receivers.routes';
import sendersRouter from '@modules/senders/infra/http/routes/senders.router';
import { Router } from 'express';

const routes = Router();

routes.use('/receivers', receiversRouter);
routes.use('/senders', sendersRouter);

export default routes;
