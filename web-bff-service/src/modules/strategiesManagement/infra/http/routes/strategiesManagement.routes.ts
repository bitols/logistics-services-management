import { isAutenticated } from '@shared/infra/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import SendersStrategyController from '../controllers/SendersStrategyController';

const strategiesManagementRouter = Router();
const sendersStrategyController = new SendersStrategyController();

strategiesManagementRouter.use(isAutenticated);

strategiesManagementRouter.get(
  '/senders/:id/storages-capacity',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  sendersStrategyController.getStoragesCapacityBySender,
);

export default strategiesManagementRouter;
