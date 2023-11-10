import { Router as ExpressRouter } from 'express';

import UserController from './controller';
import UserValidationSchema from './validation';

import { validateBody } from '../../middleware/validateSchema';

export default class Router {
  public router = ExpressRouter();
  private controller = new UserController();
  private schema = new UserValidationSchema();

  constructor() {
    this.routes();
  }

  public routes(): void {
    this.router.post('/', validateBody(this.schema.create), this.controller.create);
    this.router.get('/', this.controller.get);
    this.router.get('/:id', this.controller.getById);
  }
}
