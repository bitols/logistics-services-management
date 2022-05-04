import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

const suppliersRouter = Router();

suppliersRouter.get('/', (request, response) => {
  return response.json({ status: 'up' });
});

export default suppliersRouter;
