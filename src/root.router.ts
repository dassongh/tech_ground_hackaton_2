import { Router } from 'express';

import MapObjectRouter from './modules/mapObject/router';
import ObjectAttributeRouter from './modules/objectAttribute/router';
import UserRouter from './modules/user/router';

export default class RootRouter {
	public router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	public routes(): void {
		this.router.use('/user', new UserRouter().router);
		this.router.use('/map-object', new MapObjectRouter().router);
		this.router.use('/object-attribute', new ObjectAttributeRouter().router);

		this.router.get('/version', (req, res) => res.json({ version: 1 }));
		this.router.get('/health', (req, res) => res.json({ status: 'ok' }));
	}
}
