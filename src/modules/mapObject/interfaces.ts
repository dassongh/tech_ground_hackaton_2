import MapObject from '../../entity/mapObject';

export type MapObjectSave = Omit<MapObject, 'id'>;
