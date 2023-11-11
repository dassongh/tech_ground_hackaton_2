import { Response } from 'express';
import { ACCESS_TOKEN_COOKIE_MAX_AGE, REFRESH_TOKEN_COOKIE_MAX_AGE } from '../config';
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

	protected okPaginated<T>(res: Response, result: T): Response<ResultWithData> {
		return res.status(200).json({ count: result[1], data: result[0] });
	}

	protected setCookies(res: Response, result) {
		res.cookie('access', result.access, {
			maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE,
			sameSite: 'none',
			httpOnly: true,
		});
		res.cookie('refresh', result.refresh, {
			maxAge: REFRESH_TOKEN_COOKIE_MAX_AGE,
			sameSite: 'none',
			httpOnly: true,
		});

		return res.json({ message: 'ok' });
	}

	protected okWithMessage(res: Response, message: string): Response<ResultWithMessage> {
		return res.status(200).json({ message });
	}
}
