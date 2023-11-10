import MapObject from '../../entity/mapObject';
import { MapObjectType } from './enum';

export type MapObjectSave = Omit<MapObject, 'id'>;

export interface GetObjectsQuery {
	is_default?: string;
	type?: MapObjectType;
	attributes?: string[];
}
