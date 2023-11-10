import BaseRepository from '../../common/repository';
import ObjectAttribute from '../../entity/objectAttribute';

export default class Repository extends BaseRepository<ObjectAttribute> {
	constructor() {
		super(ObjectAttribute);
	}
}
