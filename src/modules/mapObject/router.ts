import { Router as ExpressRouter } from 'express';

import MapObjectController from './controller';
import UserValidationSchema from './validation';

import { idInParams } from '../../common/validation';
import { validateBody, validateParams, validateQuery } from '../../middleware/validateSchema';

export default class Router {
	public router = ExpressRouter();
	private controller = new MapObjectController();
	private schema = new UserValidationSchema();

	constructor() {
		this.routes();
	}

	public routes(): void {
		this.router.post('/', validateBody(this.schema.create), this.controller.create);
		this.router.get('/', validateQuery(this.schema.getObjects), this.controller.get);
		this.router.get('/:id', validateParams(idInParams), this.controller.getById);
		this.router.put(
			'/:id',

			validateParams(idInParams),
			validateBody(this.schema.update),
			this.controller.updateById,
		);
		this.router.delete('/:id', validateParams(idInParams), this.controller.deleteById);
	}
}
