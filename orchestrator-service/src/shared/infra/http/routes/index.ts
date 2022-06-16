import { Request, Response, Router } from 'express';
const routes = Router();

routes.get('/health', async (req: Request, res: Response) => {
  return res.json({ status: 'UP' });
});

export default routes;
