import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ReceiversController from '../controllers/ReceiverController';

const receiversRouter = Router();
const receiversController = new ReceiversController();

receiversRouter.get('/', receiversController.getAll);

receiversRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  receiversController.getById,
);

receiversRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      address: Joi.string().required(),
    },
  }),
  receiversController.create,
);

receiversRouter.patch(
  '/:id/location',
  celebrate({
    [Segments.BODY]: {
      location: Joi.object().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  receiversController.updateLocation,
);

receiversRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      address: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  receiversController.update,
);

receiversRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  receiversController.delete,
);

export default receiversRouter;
