import BaseRepository from '../common/repository';

import MapObject from '../entity/mapObject';
import ObjectAttribute from '../entity/objectAttribute';
import User from '../entity/user';

import { attributes, objects, user } from './data';

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
	} catch (error) {
		console.error(error);
	}
}
