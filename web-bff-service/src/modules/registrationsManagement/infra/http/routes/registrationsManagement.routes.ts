import { Router } from 'express';
import ProductsRegistrationController from '../controllers/ProductsRegistrationController';
import { celebrate, Joi, Segments } from 'celebrate';
import SendersRegistrationController from '../controllers/SendersRegistrationController';

const registrationsManamenteRouter = Router();
const productsRegistrationController = new ProductsRegistrationController();
const sendersRegistrationController = new SendersRegistrationController();

registrationsManamenteRouter.post(
  '/products',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      height: Joi.number().precision(5).required(),
      width: Joi.number().precision(5).required(),
      lenght: Joi.number().precision(5).required(),
      price: Joi.number().precision(2).required(),
      senderId: Joi.string().hex().required(),
      storageId: Joi.string().hex().required(),
    },
  }),
  productsRegistrationController.create,
);

registrationsManamenteRouter.get(
  '/senders/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  sendersRegistrationController.getInfoById,
);

export default registrationsManamenteRouter;
