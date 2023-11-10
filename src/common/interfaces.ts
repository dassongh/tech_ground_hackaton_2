import MapObject from '../entity/mapObject';
import ObjectAttribute from '../entity/objectAttribute';
import User from '../entity/user';

export type Entity = User | MapObject | ObjectAttribute;

export interface ResultWithData {
	data: Record<string, any> | Record<string, any>[];
}

export interface ResultWithMessage {
	message: string;
}
