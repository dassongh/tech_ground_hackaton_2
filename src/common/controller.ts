import { Response } from 'express';
import { ResultWithData, ResultWithMessage } from './interfaces';

export default class BaseController {
  private sendResponse<T>(res: Response, code: number, result: T): Response<ResultWithData> {
    return res.status(code).json({ data: result });
  }

  protected ok<T>(res: Response, result: T): Response<ResultWithData> {
    return this.sendResponse(res, 200, result);
  }

  protected created<T>(res: Response, result: T): Response<ResultWithData> {
    return this.sendResponse(res, 201, result);
  }

  protected okWithMessage(res: Response, message: string): Response<ResultWithMessage> {
    return res.status(200).json({ message });
  }
}
