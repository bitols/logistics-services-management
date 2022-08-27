import { isAutenticated } from '@shared/infra/middlewares/isAuthenticated';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import receiversRouter from '@modules/receivers/infra/http/routes/receivers.routes';
import sendersRouter from '@modules/senders/infra/http/routes/senders.routes';
import storagesRouter from '@modules/storages/infra/http/routes/storages.routes';
import suppliersRouter from '@modules/suppliers/infra/http/routes/suppliers.router';

import { Router } from 'express';

const routes = Router();

routes.use(isAutenticated);

routes.use('/products', productsRouter);
routes.use('/receivers', receiversRouter);
routes.use('/senders', sendersRouter);
routes.use('/storages', storagesRouter);
routes.use('/suppliers', suppliersRouter);

export default routes;
