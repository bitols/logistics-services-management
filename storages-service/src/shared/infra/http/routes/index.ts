import { Router } from 'express';
import storagesRouter from '@modules/storages/infra/http/routers/storages.routes';

const routes = Router();

routes.use('/storages', storagesRouter);

export default routes;
