import {DefaultCrudRepository} from '@loopback/repository';
import {Cases, CasesRelations} from '../models';
import {PostegressConnectorDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CasesRepository extends DefaultCrudRepository<
  Cases,
  typeof Cases.prototype.id,
  CasesRelations
> {
  constructor(
    @inject('datasources.postegressConnector') dataSource: PostegressConnectorDataSource,
  ) {
    super(Cases, dataSource);
  }
}
