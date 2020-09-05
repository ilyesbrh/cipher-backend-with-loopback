import {DefaultCrudRepository} from '@loopback/repository';
import {Tasks, TasksRelations} from '../models';
import {PostegressConnectorDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TasksRepository extends DefaultCrudRepository<
  Tasks,
  typeof Tasks.prototype.id,
  TasksRelations
> {
  constructor(
    @inject('datasources.postegressConnector') dataSource: PostegressConnectorDataSource,
  ) {
    super(Tasks, dataSource);
  }
}
