import { Schema } from 'joi';
import joiToSwagger from 'joi-to-swagger';

export default class SwaggerHelper {
	public toRequestBody(joiSchema: Schema): Record<string, any> {
		const swaggerSchema = joiToSwagger(joiSchema);

		return {
			content: {
				'application/json': {
					schema: swaggerSchema.swagger,
				},
			},
		};
	}

	public toMultipartRequestBody(properties) {
		return {
			content: {
				'multipart/form-data': {
					schema: {
						type: 'object',
						properties,
					},
				},
			},
		};
	}

	public toResponse(obj, description?) {
		return this.toSimpleResponse(this.objToSchema(obj), description);
	}

	public toBinaryResponse(content) {
		return {
			description: 'File',
			content: {
				[content]: {
					schema: { type: 'string', format: 'binary' },
				},
			},
		};
	}

	public toArrayResponse(obj, description?) {
		return this.toSimpleResponse(
			{
				data: {
					type: 'array',
					items: {
						type: 'object',
						properties: this.objToSchema(obj),
					},
					description,
				},
			},
			description,
		);
	}

	public toPaginationResponse(itemSchema, description?) {
		const items = {
			type: typeof itemSchema,
		};
		if (items.type === 'object') {
			Object.assign(items, { properties: this.objToSchema(itemSchema) });
		}
		return this.toSimpleResponse(
			{
				pagination: {
					type: 'object',
					properties: this.objToSchema({
						page: 1,
						limit: 10,
						count: 2,
					}),
				},
				data: {
					type: 'array',
					items,
				},
			},
			description,
		);
	}

	public inPath(name: string, description: string) {
		return {
			name,
			description,
			in: 'path',
			required: true,
			type: 'string',
		};
	}

	public toParameters(schema) {
		const { swagger } = joiToSwagger(schema);

		return Object.keys(swagger.properties).reduce((acc, name): any => {
			const item = {
				in: 'query',
				name,
			};

			Object.assign(item, { schema: swagger.properties[name] });
			if (swagger.required) {
				Object.assign(item, { required: swagger.required.includes(name) });
			}
			if (swagger.properties[name].description) {
				Object.assign(item, { description: swagger.properties[name].description });
			}

			return [...acc, item];
		}, []);
	}

	private toSimpleResponse(schema, description) {
		return {
			description,
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: schema,
					},
				},
			},
		};
	}

	private objToSchema(obj) {
		return Object.keys(obj).reduce(
			(schema, key) => ({
				...schema,
				[key]: {
					type: typeof obj[key],
					example: obj[key],
				},
			}),
			{},
		);
	}
}
