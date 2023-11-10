import { Router as ExpressRouter } from 'express';

import ObjectAttributeController from './controller';

export default class Router {
	public router = ExpressRouter();
	private controller = new ObjectAttributeController();

	constructor() {
		this.routes();
	}

	public routes(): void {
		this.router.get('/', this.controller.get);
	}
}
