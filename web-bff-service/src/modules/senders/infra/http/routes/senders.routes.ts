import { Router } from 'express';
import SendersController from '../controllers/SendersController';
import { celebrate, Joi, Segments } from 'celebrate';

const sendersRouter = Router();
const sendersController = new SendersController();

sendersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  sendersController.getById,
);

sendersRouter.get(
  '/:id/storages',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  sendersController.getStorages,
);

export default sendersRouter;
