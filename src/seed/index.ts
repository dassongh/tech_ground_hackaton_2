import fs from 'node:fs/promises';
import path from 'node:path';

import BaseRepository from '../common/repository';
import ObjectAttribute from '../entity/objectAttribute';

const attributeRepository = new BaseRepository(ObjectAttribute);

export default async function loadSeedData() {
	try {
		const existedAttributes = await attributeRepository.get({});
		if (existedAttributes.length) return;
		const attributes = await fs.readFile(path.resolve(__dirname, './attributes.json'), 'utf-8');
		const parsedAttributes = JSON.parse(attributes);
		await attributeRepository.save(parsedAttributes.attributes);
	} catch (error) {
		console.error(error);
	}
}
