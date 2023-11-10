import Joi from 'joi';
import { MapObjectType, StreetType } from './enum';

export default class Schema {
	public create = Joi.object().keys({
		latitude: Joi.string().required(),
		longitude: Joi.string().required(),
		title: Joi.string().required(),
		type: Joi.string()
			.valid(...Object.values(MapObjectType))
			.required(),
		city: Joi.string().required(),
		street_name: Joi.string().required(),
		street_type: Joi.string()
			.valid(...Object.values(StreetType))
			.required(),
		building: Joi.string().optional(),
		campus: Joi.string().optional(),
		phone: Joi.string().optional(),
		website: Joi.string().optional(),
		attributes: Joi.array()
			.items(Joi.object().keys({ id: Joi.number().required() }))
			.optional(),
	});

	public update = Joi.object().keys({
		latitude: Joi.string().optional(),
		longitude: Joi.string().optional(),
		title: Joi.string().optional(),
		type: Joi.string()
			.valid(...Object.values(MapObjectType))
			.optional(),
		city: Joi.string().optional(),
		street_name: Joi.string().optional(),
		street_type: Joi.string()
			.valid(...Object.values(StreetType))
			.optional(),
		building: Joi.string().optional(),
		campus: Joi.string().optional(),
		phone: Joi.string().optional(),
		website: Joi.string().optional(),
		attributes: Joi.array()
			.items(Joi.object().keys({ id: Joi.number().required() }))
			.optional(),
	});
}
