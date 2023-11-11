import jwt from 'jsonwebtoken';
import { TokenType } from '../common/enum';
import { ACCESS_TOKEN_EXPIRE, ACCESS_TOKEN_SALT, REFRESH_TOKEN_EXPIRE, REFRESH_TOKEN_SALT } from '../config';
import { TokenPayload } from '../modules/user/interfaces';

export function createToken(tokenData: TokenPayload, tokenType: TokenType) {
	const options = {
		[TokenType.ACCESS]: { salt: ACCESS_TOKEN_SALT, expiresIn: ACCESS_TOKEN_EXPIRE },
		[TokenType.REFRESH]: { salt: REFRESH_TOKEN_SALT, expiresIn: REFRESH_TOKEN_EXPIRE },
	};

	const { salt, expiresIn } = options[tokenType];
	return jwt.sign(tokenData, salt, { expiresIn });
}

export function verifyToken(token: string, tokenType: TokenType) {
	const saltOptions = {
		[TokenType.ACCESS]: ACCESS_TOKEN_SALT,
		[TokenType.REFRESH]: REFRESH_TOKEN_SALT,
	};

	return jwt.verify(token, saltOptions[tokenType]);
}
