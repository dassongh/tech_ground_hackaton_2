import UserService from '../user/service';

import { NextFunction, Request, Response } from 'express';
import BaseController from '../../common/controller';
import { TokenType } from '../../common/enum';
import { CustomError } from '../../utils/customError';
import { createToken } from '../../utils/jwtHelper';
import passwordCrypt from '../../utils/passwordCrypt';
import { Login } from './interfaces';

export default class Controller extends BaseController {
	private userService = new UserService();

	public login = async (req: Request, res: Response, next: NextFunction) => {
		const userData: Login = req.body;

		const user = await this.userService.getOneByEmail(userData.email);
		if (!user) {
			return next(new CustomError(400, 'Email or password is not correct'));
		}

		const passwordHash = passwordCrypt(userData.password);
		if (passwordHash !== user.password) {
			return next(new CustomError(400, 'Email or password is not correct'));
		}

		const tokens = {
			access: createToken({ id: user.id }, TokenType.ACCESS),
			refresh: createToken({ id: user.id }, TokenType.REFRESH),
		};

		return this.setCookies(res, {
			access: tokens.access,
			refresh: tokens.refresh,
		});
	};

	public logout = (req: Request, res: Response) => {
		return this.setCookies(res, {
			access: '',
			refresh: '',
		});
	};
}
