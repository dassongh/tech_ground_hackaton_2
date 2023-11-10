import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils/customError';

export const routeNotFound = (req: Request, res: Response) => {
  return res.status(404).json({ message: 'NOT_FOUND_ENDPOINT' });
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const errorHandler = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  const { message, status } = err;
  if (!status) console.error(err);
  return res.status(status || 500).json({ error: message });
};
