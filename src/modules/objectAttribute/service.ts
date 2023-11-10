import ObjectAttribute from '../../entity/objectAttribute';
import Repository from './repository';

export default class Service {
	private repository = new Repository();

	public get(): Promise<ObjectAttribute[]> {
		return this.repository.get({});
	}
}
