import { DataSource } from 'typeorm';

import { POSTGRES_DB, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USER } from './config';

import MapObject from './entity/mapObject';
import ObjectAttribute from './entity/objectAttribute';
import User from './entity/user';

export default new DataSource({
	type: 'postgres',
	host: POSTGRES_HOST,
	port: POSTGRES_PORT,
	username: POSTGRES_USER,
	password: POSTGRES_PASSWORD,
	database: POSTGRES_DB,
	logging: false,
	synchronize: true,
	entities: [User, MapObject, ObjectAttribute],
});
