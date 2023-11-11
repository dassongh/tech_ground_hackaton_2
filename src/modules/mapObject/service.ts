import Repository from './repository';

import { Pagination, WithPagination } from '../../common/interfaces';
import MapObject from '../../entity/mapObject';
import { CustomError } from '../../utils/customError';
import { GetObjectsQuery, MapObjectSave } from './interfaces';

export default class Service {
	private repository = new Repository();

	public save(mapObject: MapObjectSave): Promise<MapObject> {
		return this.repository.save(mapObject);
	}

	public get(pagination: Pagination, query: GetObjectsQuery): WithPagination<MapObject[]> {
		return this.repository.getMapObjectsAndCount(pagination, query);
	}

	public getById(id: number): Promise<MapObject | null> {
		return this.repository.getOneOrFail({ id }, { attributes: true });
	}

	public async updateById(id: number, mapObject: MapObjectSave): Promise<MapObject> {
		const existedMapObject = await this.repository.getOneOrFail({ id });
		if (existedMapObject.is_default) {
			throw new CustomError(409, 'Default map object cannot be updated');
		}

		const payload = { ...existedMapObject, ...mapObject };
		const updatedObject = await this.repository.save(payload);
		return updatedObject;
	}

	public deleteById = async (id: number): Promise<string> => {
		const mapObject = await this.repository.getOne({ id, is_default: true });
		if (mapObject) {
			throw new CustomError(409, 'Default mapObject cannot be deleted');
		}

		await this.repository.delete(id);
		return 'Deleted';
	};
}
