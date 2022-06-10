import receiversRouter from '@modules/receivers/infra/http/routes/receivers.routes';
import strategiesManagementRouter from '@modules/strategiesManagement/infra/http/routes/strategiesManagement.routes';
import registrationsManagementRouter from '@modules/registrationsManagement/infra/http/routes/registrationsManagement.routes';

import { Router } from 'express';
const routes = Router();

routes.use('/receivers', receiversRouter);
routes.use('/strategies-management', strategiesManagementRouter);
routes.use('/registrations-management', registrationsManagementRouter);
export default routes;
