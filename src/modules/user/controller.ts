import { NextFunction, Request, Response } from 'express';

import Service from './service';

import BaseController from '../../common/controller';

export default class Controller extends BaseController {
  private service = new Service();

  public create = (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    return this.service
      .save(user)
      .then(result => this.created(res, result))
      .catch(next);
  };

  public get = (_req: Request, res: Response, next: NextFunction) => {
    return this.service
      .get()
      .then(result => this.ok(res, result))
      .catch(next);
  };

  public getById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return this.service
      .getById(Number(id))
      .then(result => this.ok(res, result))
      .catch(next);
  };
}
