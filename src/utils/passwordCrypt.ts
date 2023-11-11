import crypto from 'crypto';
import { PASSWORD_SALT } from '../config';

export default function passwordCrypt(password: string) {
	return crypto.pbkdf2Sync(password, PASSWORD_SALT, 1000, 64, 'sha512').toString('hex');
}
