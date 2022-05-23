import { Router } from 'express';
import SendersController from '../controllers/SendersController';
import { celebrate, Joi, Segments } from 'celebrate';

const sendersRouter = Router();
const sendersController = new SendersController();

sendersRouter.get('/', sendersController.getAll);

sendersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  sendersController.getById,
);

sendersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
    },
  }),
  sendersController.create,
);

sendersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  sendersController.update,
);

sendersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  sendersController.delete,
);

export default sendersRouter;
