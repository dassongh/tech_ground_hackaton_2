import Joi from 'joi';

export const idInParams = Joi.object().keys({
	id: Joi.number().required(),
});
