import Repository from './repository';

import MapObject from '../../entity/mapObject';
import { CustomError } from '../../utils/customError';
import { MapObjectSave } from './interfaces';

export default class Service {
	private repository = new Repository();

	public save(mapObject: MapObjectSave): Promise<MapObject> {
		return this.repository.save(mapObject);
	}

	public get(): Promise<MapObject[]> {
		return this.repository.get({});
	}

	public getById(id: number): Promise<MapObject | null> {
		return this.repository.getOneOrFail({ id });
	}

	public async updateById(id: number, mapObject: MapObjectSave): Promise<MapObject> {
		const existedMapObject = await this.repository.getOneOrFail({ id });
		if (existedMapObject.isDefault) {
			throw new CustomError(409, 'Default map object cannot be updated');
		}

		const payload = { ...existedMapObject, mapObject };
		const updatedObject = await this.repository.save(payload);
		return updatedObject;
	}

	public deleteById = async (id: number): Promise<string> => {
		const mapObject = await this.repository.getOne({ id, isDefault: true });
		if (mapObject) {
			throw new CustomError(409, 'Default mapObject cannot be deleted');
		}

		await this.repository.delete(id);
		return 'Deleted';
	};
}
