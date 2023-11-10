import BaseRepository from '../../common/repository';
import MapObject from '../../entity/mapObject';

export default class Repository extends BaseRepository<MapObject> {
	constructor() {
		super(MapObject);
	}
}
