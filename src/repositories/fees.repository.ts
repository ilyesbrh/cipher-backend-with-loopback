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
  }
}
