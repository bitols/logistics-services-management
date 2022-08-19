import { isAutenticated } from '@shared/infra/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ReceiversController from '../../../../registrationsManagement/infra/http/controllers/ReceiversRegistrationController';

const receiversRouter = Router();
const receiversController = new ReceiversController();

receiversRouter.use(isAutenticated);

receiversRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  receiversController.getInfoById,
);

export default receiversRouter;
