import { isAutenticated } from '@shared/infra/middlewares/isAuthenticated';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import sendersRouter from '@modules/senders/infra/http/routes/senders.routes';
import receiversRouter from '@modules/receivers/infra/http/routes/receivers.routes';
import { Router } from 'express';

const routes = Router();

routes.use(isAutenticated);

routes.use('/products', productsRouter);
routes.use('/senders', sendersRouter);
routes.use('/receivers', receiversRouter);

export default routes;
