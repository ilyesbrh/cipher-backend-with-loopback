import {DefaultCrudRepository} from '@loopback/repository';
import {Attachments, AttachmentsRelations} from '../models';
import {PostegressConnectorDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AttachmentsRepository extends DefaultCrudRepository<
  Attachments,
  typeof Attachments.prototype.id,
  AttachmentsRelations
> {
  constructor(
    @inject('datasources.postegressConnector') dataSource: PostegressConnectorDataSource,
  ) {
    super(Attachments, dataSource);
  }
}
