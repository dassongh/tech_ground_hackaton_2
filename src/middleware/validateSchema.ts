import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';

export function validateBody(schema: Schema) {
  return ({ body }: Request, _res: Response, next: NextFunction) => {
    const error = validateRequest(schema, body);
    if (error) return next(error);

    return next();
  };
}

export function validateQuery(schema: Schema) {
  return ({ query }: Request, _res: Response, next: NextFunction) => {
    const error = validateRequest(schema, query);
    if (error) return next(error);

    return next();
  };
}

export function validateParams(schema: Schema) {
  return ({ params }: Request, _res: Response, next: NextFunction) => {
    const error = validateRequest(schema, params);
    if (error) return next(error);

    return next();
  };
}

function validateRequest(schema: Schema, property: Record<string, unknown> | string | number) {
  const { error } = schema.validate(property);
  if (error) return error;
}
