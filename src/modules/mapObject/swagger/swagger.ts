import SwaggerHelper from '../../../utils/swagger/swaggerHelper';

import MapObjectSchema from '../validation';

import { mapObject, mapObjectSave } from '../../../utils/swagger/entities/MapObject';
import * as errorResponse from '../../../utils/swagger/errors';

const tags = ['MapObject'];
const urlPrefix = '/map-object';

const helper = new SwaggerHelper();
const schema = new MapObjectSchema();

export default {
	[`${urlPrefix}`]: {
		get: {
			tags,
			summary: 'List of Objects',
			parameters: helper.toParameters(schema.getObjects),
			responses: {
				200: helper.toResponse({ data: mapObject, count: 1 }),
				...errorResponse.badRequest,
				...errorResponse.InternalServer,
			},
		},
		post: {
			tags,
			summary: 'Add Object',
			requestBody: helper.toRequestBody(schema.create),
			responses: {
				200: helper.toResponse({ data: mapObjectSave }),
				...errorResponse.badRequest,
				...errorResponse.InternalServer,
			},
		},
	},
	[`${urlPrefix}/{id}`]: {
		get: {
			tags,
			summary: 'Get object by id',
			parameters: [helper.inPath('id', 'Object id')],
			responses: {
				200: helper.toResponse({ data: mapObject }),
				...errorResponse.badRequest,
				...errorResponse.InternalServer,
			},
		},
		put: {
			tags,
			summary: 'Update object (doesn`t work for default ones)',
			parameters: [helper.inPath('id', 'Object id')],
			requestBody: helper.toRequestBody(schema.update),
			responses: {
				200: helper.toResponse({ data: mapObject }),
				...errorResponse.badRequest,
				...errorResponse.InternalServer,
			},
		},
		delete: {
			tags,
			summary: 'Delete object (doesn`t work for default ones)',
			parameters: [helper.inPath('id', 'Object id')],
			responses: {
				200: helper.toResponse({ message: 'Deleted' }),
				...errorResponse.badRequest,
				...errorResponse.InternalServer,
			},
		},
	},
};
