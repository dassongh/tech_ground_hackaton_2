import User from '../../entity/user';

export type UserSave = Omit<User, 'id'>;

export interface TokenPayload {
	id: number;
}
