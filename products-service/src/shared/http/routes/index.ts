import { Router } from "express";

const routes = Router();

routes.get('/', (request, response) =>{
  return response.json({ status: 'up' });
});

export default routes;
