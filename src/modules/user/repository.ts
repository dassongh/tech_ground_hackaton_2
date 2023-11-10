import BaseRepository from '../../common/repository';
import User from '../../entity/user';

export default class Repository extends BaseRepository<User> {
  constructor() {
    super(User);
  }
}
