import { Router } from 'express';
import SendersController from '../controllers/SendersController';
import { celebrate, Joi, Segments } from 'celebrate';
import { loggingRequest } from '@shared/infra/middlewares/loggingRequest';

const sendersRouter = Router();
const sendersController = new SendersController();

sendersRouter.get(
  '/:id',
  loggingRequest,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  sendersController.getById,
);

sendersRouter.get(
  '/:id/storages',
  loggingRequest,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  sendersController.getStorages,
);

sendersRouter.get(
  '/:id/products',
  loggingRequest,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  sendersController.getProducts,
);
export default sendersRouter;
