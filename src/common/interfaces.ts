import MapObject from '../entity/mapObject';
import ObjectAttribute from '../entity/objectAttribute';
import User from '../entity/user';

export type Entity = User | MapObject | ObjectAttribute;

export interface ResultWithData {
	data: Record<string, any> | Record<string, any>[];
	count?: number;
}

export interface ResultWithMessage {
	message: string;
}

export interface Pagination {
	skip: number;
	take: number;
}

export type WithPagination<E> = Promise<[E, number]>;
