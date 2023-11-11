import Joi from 'joi';

export default class Schema {
	public login = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(1).max(30).required(),
	});
}
