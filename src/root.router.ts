import { Router } from 'express';

import UserRouter from './modules/user/router';

export default class RootRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    this.router.use('/user', new UserRouter().router);
    this.router.get('/version', (req, res) => res.json({ version: 1 }));
    this.router.get('/health', (req, res) => res.json({ status: 'ok' }));
  }
}
