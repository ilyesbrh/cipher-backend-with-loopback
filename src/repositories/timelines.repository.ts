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
  }
}
