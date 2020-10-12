import {DefaultCrudRepository} from '@loopback/repository';
import {Fees, FeesRelations} from '../models';
import {PostegressConnectorDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FeesRepository extends DefaultCrudRepository<
  Fees,
  typeof Fees.prototype.id,
  FeesRelations
  > {
  constructor(
    @inject('datasources.postegressConnector') dataSource: PostegressConnectorDataSource,
  ) {
    super(Fees, dataSource);

    /* this line when you add it you can update 'updatedAt' on every time data changes */

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.modelClass as any).observe('persist', async (ctx: any) => {
      ctx.data.updatedAt = new Date().getTime();
    });

  }
}
