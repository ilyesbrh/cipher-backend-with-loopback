import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {PostegressConnectorDataSource} from '../datasources';
import {User, UserCredentials, UserRelations} from '../models';
import {UserCredentialsRepository} from './user-credentials.repository';

export type Credentials = {
  email: string;
  password: string;
  role?: string
};
export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
  > {

  public readonly userCredentials: HasOneRepositoryFactory<UserCredentials, typeof User.prototype.id>;

  constructor(
    @inject('datasources.postegressConnector') dataSource: PostegressConnectorDataSource, @repository.getter('UserCredentialsRepository') protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>,
  ) {
    super(User, dataSource);
    this.userCredentials = this.createHasOneRepositoryFactoryFor('userCredentials', userCredentialsRepositoryGetter);
    this.registerInclusionResolver('userCredentials', this.userCredentials.inclusionResolver);
  }
  async findCredentials(userId: typeof User.prototype.id): Promise<UserCredentials | undefined> {
    try {

      const uc = await this.userCredentials(userId).get();

      return uc;
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
