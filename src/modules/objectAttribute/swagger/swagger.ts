import SwaggerHelper from '../../../utils/swagger/swaggerHelper';

import { objectAttribute } from '../../../utils/swagger/entities/ObjectAttribute';
import * as errorResponse from '../../../utils/swagger/errors';

const tags = ['ObjectAttribute'];
const urlPrefix = '/object-attribute';

const helper = new SwaggerHelper();

export default {
	[`${urlPrefix}`]: {
		get: {
			tags,
			summary: 'List of Objects',
			responses: {
				200: helper.toResponse({ data: objectAttribute }),
				...errorResponse.badRequest,
				...errorResponse.InternalServer,
			},
		},
	},
};
