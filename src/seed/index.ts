import BaseRepository from '../common/repository';

import MapObject from '../entity/mapObject';
import ObjectAttribute from '../entity/objectAttribute';

import { attributes, objects } from './data';

const attributeRepository = new BaseRepository(ObjectAttribute);
const objectRepository = new BaseRepository(MapObject);

export default async function loadSeedData() {
	try {
		const existedAttributes = await attributeRepository.get({});
		if (!existedAttributes.length) await attributeRepository.save(attributes);

		const existedDefaultObjects = await objectRepository.get({ is_default: true });
		if (!existedDefaultObjects.length) await objectRepository.save(objects);
	} catch (error) {
		console.error(error);
	}
}
