import receiversRouter from '@modules/receivers/infra/http/routes/receivers.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/receivers', receiversRouter);

export default routes;
