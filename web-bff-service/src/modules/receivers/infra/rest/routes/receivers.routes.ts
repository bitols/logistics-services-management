import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ReceiversController from '../../../../registrationsManagement/infra/http/controllers/ReceiversRegistrationController';

const receiversRouter = Router();
const receiversController = new ReceiversController();

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
