import { Router as ExpressRouter } from 'express';

import { validateBody } from '../../middleware/validateSchema';
import Controller from './controller';
import Schema from './validation';

export default class Router {
	public router: ExpressRouter;
	private controller: Controller;
	private schema: Schema;

	constructor() {
		this.router = ExpressRouter();
		this.controller = new Controller();
		this.schema = new Schema();
		this.routes();
	}

	public routes(): void {
		this.router.post('/login', validateBody(this.schema.login), this.controller.login);
		this.router.post('/logout', this.controller.logout);
	}
}
