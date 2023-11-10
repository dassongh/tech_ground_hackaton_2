import Joi from 'joi';

export default class Schema {
  public create = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  });
}
