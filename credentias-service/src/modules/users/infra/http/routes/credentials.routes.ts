import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CredentialsController from '../controllers/CredentialsController';

const credentialsRouter = Router();
const credentialsController = new CredentialsController();

credentialsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      senderId: Joi.string().hex().required(),
    },
  }),
  credentialsController.create,
);

export default credentialsRouter;
