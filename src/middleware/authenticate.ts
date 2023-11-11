import { NextFunction, Request, Response } from 'express';

import { Login } from '../modules/auth/interfaces';

import { TokenType } from '../common/enum';

import { ACCESS_TOKEN_COOKIE_MAX_AGE, REFRESH_TOKEN_COOKIE_MAX_AGE } from '../config';
import { AuthError, CustomError } from '../utils/customError';
import { createToken, verifyToken } from '../utils/jwtHelper';

export default async function authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
	const { access, refresh } = req.cookies;

	if (!access && !refresh) {
		return next(new AuthError());
	}

	let tokenData: Login | undefined;
	if (!access) {
		const updatedTokens = await updateAccessToken(refresh);
		if (updatedTokens.error) {
			res.clearCookie('refresh');
			return next(updatedTokens.error);
		}

		tokenData = updatedTokens.tokenData as Login;

		res.cookie('access', updatedTokens?.tokens?.access, {
			maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE,
			sameSite: 'none',
			httpOnly: true,
		});
		res.cookie('refresh', updatedTokens?.tokens?.refresh, {
			maxAge: REFRESH_TOKEN_COOKIE_MAX_AGE,
			sameSite: 'none',
			httpOnly: true,
		});

		req.user = tokenData;
		return next();
	}

	try {
		tokenData = verifyToken(access, TokenType.ACCESS);
	} catch (error: any) {
		if (error.name !== 'TokenExpiredError') {
			return next(new CustomError(400, 'Token parse error'));
		}
	}

	if (!tokenData) {
		const updatedTokens = await updateAccessToken(refresh);
		if (updatedTokens.error) {
			res.clearCookie('access');
			res.clearCookie('refresh');
			return next(updatedTokens.error);
		}

		tokenData = updatedTokens.tokenData as Login;

		res.cookie('access', updatedTokens?.tokens?.access, {
			maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE,
			sameSite: 'none',
			httpOnly: true,
		});
		res.cookie('refresh', updatedTokens?.tokens?.refresh, {
			maxAge: REFRESH_TOKEN_COOKIE_MAX_AGE,
			sameSite: 'none',
			httpOnly: true,
		});
	}

	req.user = tokenData;
	return next();
}

async function updateAccessToken(
	refreshToken: string,
): Promise<{ error: unknown; tokenData?; tokens?: { access: string; refresh: string } }> {
	let tokenData;
	try {
		tokenData = verifyToken(refreshToken, TokenType.REFRESH) as Login;
	} catch (error) {
		return { error };
	}

	const tokens = {
		access: createToken({ id: tokenData.id }, TokenType.ACCESS),
		refresh: createToken({ id: tokenData.id }, TokenType.REFRESH),
	};

	return {
		error: null,
		tokenData,
		tokens,
	};
}
