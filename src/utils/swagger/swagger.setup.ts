import { NODE_ENV, PORT } from '../../config';

import { auth } from '../../modules/auth/swagger';
import { MapObject } from '../../modules/mapObject/swagger';
import { ObjectAttribute } from '../../modules/objectAttribute/swagger';

const url = {
	local: `http://localhost:${PORT}/api/v1`,
	development: `http://16.171.65.177:${PORT}/api/v1`,
};

export default {
	openapi: '3.0.0',
	info: {
		version: '1.0.0',
		title: 'Tech Ground Hackaton API',
	},
	components: {
		securitySchemes: {
			cookieAuth: {
				type: 'apiKey',
				in: 'cookie',
				name: 'access',
			},
		},
	},
	security: [
		{
			cookieAuth: ['read', 'write'],
		},
	],
	servers: [
		{
			url: url[NODE_ENV],
		},
	],
	paths: { ...auth, ...MapObject, ...ObjectAttribute },
};
