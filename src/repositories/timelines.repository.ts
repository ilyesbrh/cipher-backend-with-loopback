import {DefaultCrudRepository} from '@loopback/repository';
import {Timelines, TimelinesRelations} from '../models';
import {PostegressConnectorDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TimelinesRepository extends DefaultCrudRepository<
  Timelines,
  typeof Timelines.prototype.id,
  TimelinesRelations
  > {
  constructor(
    @inject('datasources.postegressConnector') dataSource: PostegressConnectorDataSource,
  ) {
    super(Timelines, dataSource);

    /* this line when you add it you can update 'updatedAt' on every time data changes */

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.modelClass as any).observe('persist', async (ctx: any) => {
      ctx.data.updatedAt = new Date().getTime();
    });

  }
}
