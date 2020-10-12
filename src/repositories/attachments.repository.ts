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

    /* this line when you add it you can update 'updatedAt' on every time data changes */

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.modelClass as any).observe('persist', async (ctx: any) => {
      ctx.data.updatedAt = new Date().getTime();
    });

  }
}
