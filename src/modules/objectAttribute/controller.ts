import { NextFunction, Request, Response } from 'express';

import Service from './service';

import BaseController from '../../common/controller';

export default class Controller extends BaseController {
	private service = new Service();

	public get = (_req: Request, res: Response, next: NextFunction) => {
		return this.service
			.get()
			.then(result => this.ok(res, result))
			.catch(next);
	};
}
