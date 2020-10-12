import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {PostegressConnectorDataSource} from '../datasources';
import {Cases, Tasks, TasksRelations} from '../models';
import {CasesRepository} from './cases.repository';

export class TasksRepository extends DefaultCrudRepository<
  Tasks,
  typeof Tasks.prototype.id,
  TasksRelations
  > {

  public readonly cases: BelongsToAccessor<Cases, typeof Tasks.prototype.id>;

  constructor(
    @inject('datasources.postegressConnector') dataSource: PostegressConnectorDataSource, @repository.getter('CasesRepository') protected casesRepositoryGetter: Getter<CasesRepository>,
  ) {
    super(Tasks, dataSource);
    this.cases = this.createBelongsToAccessorFor('cases', casesRepositoryGetter,);
    this.registerInclusionResolver('cases', this.cases.inclusionResolver);

    /* this line when you add it you can update 'updatedAt' on every time data changes */

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.modelClass as any).observe('persist', async (ctx: any) => {
      ctx.data.updatedAt = new Date().getTime();
    });
  }
}
