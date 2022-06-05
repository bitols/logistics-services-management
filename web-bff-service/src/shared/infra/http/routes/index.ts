import receiversRouter from '@modules/receivers/infra/http/routes/receivers.routes';
import sendersRouter from '@modules/senders/infra/http/routes/senders.router';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/receivers', receiversRouter);
routes.use('/senders', sendersRouter);
routes.use('/products', productsRouter);
export default routes;
