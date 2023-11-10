import Repository from './repository';

import User from '../../entity/user';
import { UserSave } from './interfaces';

export default class Service {
  private repository = new Repository();

  public save(user: UserSave): Promise<User> {
    return this.repository.save(user);
  }

  public get(): Promise<User[]> {
    return this.repository.get({});
  }

  public getById(id: number): Promise<User | null> {
    return this.repository.getOneOrFail({ id });
  }
}
