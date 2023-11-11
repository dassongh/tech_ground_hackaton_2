import { Router } from 'express';

import swaggerUi from 'swagger-ui-express';
import swaggerSetup from './utils/swagger/swagger.setup';

import AuthRouter from './modules/auth/router';
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
		this.router.get('/docs/swagger_ui_dark.min.css', (req, res) =>
			res.sendFile(`${__dirname}/utils/swagger/css/swagger_ui_dark.min.css`),
		);

		this.router.use(
			'/docs',
			swaggerUi.serve,
			swaggerUi.setup(swaggerSetup, {
				customCssUrl: '/api/v1/docs/swagger_ui_dark.min.css',
			}),
		);

		this.router.use('/user', new UserRouter().router);
		this.router.use('/map-object', new MapObjectRouter().router);
		this.router.use('/object-attribute', new ObjectAttributeRouter().router);
		this.router.use('/auth', new AuthRouter().router);

		this.router.get('/version', (req, res) => res.json({ version: 1 }));
		this.router.get('/health', (req, res) => res.json({ status: 'ok' }));
	}
}
