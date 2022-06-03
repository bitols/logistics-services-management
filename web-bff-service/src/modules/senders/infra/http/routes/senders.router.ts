import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import SendersController from '../controllers/SendersController';

const sendersRouter = Router();
const sendersController = new SendersController();

sendersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  sendersController.getInfoById,
);
sendersRouter.get(
  '/:id/products',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  sendersController.getProductsById,
);

export default sendersRouter;
