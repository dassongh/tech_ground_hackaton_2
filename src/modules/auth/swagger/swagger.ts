import * as errorResponse from '../../../utils/swagger/errors';
import SwaggerHelper from '../../../utils/swagger/swaggerHelper';
import AuthSchema from '../validation';

const tags = ['Auth'];
const urlPrefix = '/auth';

const helper = new SwaggerHelper();
const schema = new AuthSchema();

export default {
	[`${urlPrefix}/login`]: {
		post: {
			tags,
			summary: 'Login',
			requestBody: helper.toRequestBody(schema.login),
			responses: {
				200: helper.toResponse({ message: 'ok' }),
				...errorResponse.badRequest,
				...errorResponse.InternalServer,
			},
		},
	},
	[`${urlPrefix}/logout`]: {
		post: {
			tags,
			summary: 'Logout',
			responses: {
				200: helper.toResponse({
					message: 'Logout',
				}),
				...errorResponse.badRequest,
				...errorResponse.InternalServer,
			},
		},
	},
};
