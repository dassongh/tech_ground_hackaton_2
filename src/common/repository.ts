import {
	DeepPartial,
	DeleteResult,
	EntityTarget,
	FindManyOptions,
	FindOptionsOrder,
	FindOptionsRelations,
	FindOptionsWhere,
	Repository,
	UpdateResult,
} from 'typeorm';
import AppDataSource from '../data-source';

import { DBError } from '../utils/customError';
import { Entity } from './interfaces';

export default class BaseRepository<E extends Entity> {
	protected entity: Repository<E>;

	constructor(entity: EntityTarget<E>) {
		this.entity = AppDataSource.getRepository(entity);
	}

	public async save(payload: DeepPartial<E>): Promise<E> {
		try {
			return await this.entity.save(payload);
		} catch (error) {
			throw new DBError(error);
		}
	}

	public async update(where: number | FindOptionsWhere<E>, update: Record<string, any>): Promise<UpdateResult> {
		try {
			return await this.entity.update(where, update);
		} catch (error) {
			throw new DBError(error);
		}
	}

	public async get(
		where: FindOptionsWhere<E>,
		relations?: FindOptionsRelations<E>,
		pagination?: { skip: FindManyOptions<E>['skip']; take: FindManyOptions<E>['take'] },
		order?: FindOptionsOrder<E>,
	): Promise<E[]> {
		try {
			return await this.entity.find({ where, relations, order, ...pagination });
		} catch (error) {
			throw new DBError(error);
		}
	}

	public async getOne(where: FindOptionsWhere<E>, relations?: FindOptionsRelations<E>): Promise<E | null> {
		try {
			return await this.entity.findOne({ where, relations });
		} catch (error) {
			throw new DBError(error);
		}
	}

	public async getOneOrFail(where: FindOptionsWhere<E>, relations?: FindOptionsRelations<E>): Promise<E> {
		try {
			return await this.entity.findOneOrFail({ where, relations });
		} catch (error) {
			throw new DBError(error);
		}
	}

	public async count(where: FindOptionsWhere<E>): Promise<number> {
		try {
			return await this.entity.count({ where });
		} catch (error) {
			throw new DBError(error);
		}
	}

	public async delete(where: FindOptionsWhere<E> | number): Promise<DeleteResult> {
		try {
			return await this.entity.delete(where);
		} catch (error) {
			throw new DBError(error);
		}
	}
}
