import { Router } from 'express';
import suppliersRouter from '@modules/suppliers/infra/http/routes/suppliers.routes';

const routes = Router();

routes.use('/suppliers', suppliersRouter);

export default routes;
