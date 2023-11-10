import { NextFunction, Request, Response } from 'express';

import Service from './service';

import BaseController from '../../common/controller';

export default class Controller extends BaseController {
	private service = new Service();

	public create = ({ body }: Request, res: Response, next: NextFunction) => {
		return this.service
			.save(body)
			.then(result => this.created(res, result))
			.catch(next);
	};

	public get = ({ query: { page, limit, ...query } }: Request, res: Response, next: NextFunction) => {
		const pageNumber = Number(page) || 1;
		const limitNumber = Number(limit) || 10;

		const pagination = {
			skip: limitNumber * (pageNumber - 1),
			take: limitNumber,
		};

		if (query.attributes && !Array.isArray(query.attributes)) {
			query.attributes = [query.attributes] as string[];
		}

		return this.service
			.get(pagination, query)
			.then(result => this.okPaginated(res, result))
			.catch(next);
	};

	public getById = (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		return this.service
			.getById(Number(id))
			.then(result => this.ok(res, result))
			.catch(next);
	};

	public updateById = ({ body, params }: Request, res: Response, next: NextFunction) => {
		const { id } = params;
		return this.service
			.updateById(Number(id), body)
			.then(result => this.ok(res, result))
			.catch(next);
	};

	public deleteById = (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		return this.service
			.deleteById(Number(id))
			.then(result => this.okWithMessage(res, result))
			.catch(next);
	};
}
