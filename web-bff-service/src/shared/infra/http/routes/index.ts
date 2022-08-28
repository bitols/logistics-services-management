import { isAutenticated } from '@shared/infra/middlewares/isAuthenticated';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import receiversRouter from '@modules/receivers/infra/http/routes/receivers.routes';
import sendersRouter from '@modules/senders/infra/http/routes/senders.routes';
import storagesRouter from '@modules/storages/infra/http/routes/storages.routes';
import suppliersRouter from '@modules/suppliers/infra/http/routes/suppliers.router';

import { Router } from 'express';
import sessionsRouter from '@modules/sessions/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/products', isAutenticated, productsRouter);
routes.use('/receivers', isAutenticated, receiversRouter);
routes.use('/senders', isAutenticated, sendersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/storages', isAutenticated, storagesRouter);
routes.use('/suppliers', isAutenticated, suppliersRouter);

export default routes;
