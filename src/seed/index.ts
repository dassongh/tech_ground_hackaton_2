import BaseRepository from '../common/repository';

import MapObject from '../entity/mapObject';
import ObjectAttribute from '../entity/objectAttribute';
import User from '../entity/user';
import { MapObjectType } from '../modules/mapObject/enum';

import { attributes, objects, roads, user } from './data';

const attributeRepository = new BaseRepository(ObjectAttribute);
const objectRepository = new BaseRepository(MapObject);
const userRepository = new BaseRepository(User);

export default async function loadSeedData() {
	try {
		const existedAttributes = await attributeRepository.get({});
		if (!existedAttributes.length) await attributeRepository.save(attributes);

		const existedDefaultObjects = await objectRepository.get({ is_default: true });
		if (!existedDefaultObjects.length) await objectRepository.save(objects);

		const existedUser = await userRepository.getOne({ id: 1 });
		if (!existedUser) await userRepository.save(user);

		const existedRoads = await objectRepository.get({ type: MapObjectType.ACCESSIBLE_ROAD });
		if (!existedRoads.length) await objectRepository.save(roads);
	} catch (error) {
		console.error(error);
	}
}
