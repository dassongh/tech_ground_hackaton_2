import MapObject from '../../entity/mapObject';

import BaseRepository from '../../common/repository';

import { BooleanFromQuery } from '../../common/enum';
import { Pagination } from '../../common/interfaces';
import { DBError } from '../../utils/customError';
import { GetObjectsQuery } from './interfaces';

export default class Repository extends BaseRepository<MapObject> {
	constructor() {
		super(MapObject);
	}

	async getMapObjectsAndCount(pagination: Pagination, query: GetObjectsQuery) {
		const queryBuilder = this.entity.createQueryBuilder('object').leftJoinAndSelect('object.attributes', 'attributes');

		if (query.is_default) {
			const optionsIsDefault = {
				[BooleanFromQuery.TRUE]: 'object.is_default = true',
				[BooleanFromQuery.FALSE]: 'object.is_default = false',
			};
			queryBuilder.andWhere(optionsIsDefault[query.is_default]);
		}

		if (query.type) {
			queryBuilder.andWhere('object.type = :type', { type: query.type });
		}

		if (query.attributes) {
			queryBuilder.andWhere('attributes.id IN (:...attr)', { attr: query.attributes });
		}

		queryBuilder.orderBy('object.id').skip(pagination.skip).take(pagination.take);

		try {
			return await queryBuilder.getManyAndCount();
		} catch (error) {
			throw new DBError(error);
		}
	}
}
