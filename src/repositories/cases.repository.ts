import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {PostegressConnectorDataSource} from '../datasources';
import {Attachments, Cases, CasesRelations, Fees, Tasks, Timelines} from '../models';
import {AttachmentsRepository} from './attachments.repository';
import {FeesRepository} from './fees.repository';
import {TasksRepository} from './tasks.repository';
import {TimelinesRepository} from './timelines.repository';

export class CasesRepository extends DefaultCrudRepository<
  Cases,
  typeof Cases.prototype.id,
  CasesRelations
  > {

  public readonly fees: HasManyRepositoryFactory<Fees, typeof Cases.prototype.id>;

  public readonly tasks: HasManyRepositoryFactory<Tasks, typeof Cases.prototype.id>;

  public readonly attachments: HasManyRepositoryFactory<Attachments, typeof Cases.prototype.id>;

  public readonly timelines: HasManyRepositoryFactory<Timelines, typeof Cases.prototype.id>;

  constructor(
    @inject('datasources.postegressConnector') dataSource: PostegressConnectorDataSource,
    @repository.getter('FeesRepository') protected feesRepositoryGetter: Getter<FeesRepository>,
    @repository.getter('TasksRepository') protected tasksRepositoryGetter: Getter<TasksRepository>,
    @repository.getter('AttachmentsRepository') protected attachmentsRepositoryGetter: Getter<AttachmentsRepository>,
    @repository.getter('TimelinesRepository') protected timelinesRepositoryGetter: Getter<TimelinesRepository>,
  ) {
    super(Cases, dataSource);
    this.timelines = this.createHasManyRepositoryFactoryFor('timelines', timelinesRepositoryGetter,);
    this.registerInclusionResolver('timelines', this.timelines.inclusionResolver);
    this.attachments = this.createHasManyRepositoryFactoryFor('attachments', attachmentsRepositoryGetter,);
    this.registerInclusionResolver('attachments', this.attachments.inclusionResolver);
    this.tasks = this.createHasManyRepositoryFactoryFor('tasks', tasksRepositoryGetter,);
    this.registerInclusionResolver('tasks', this.tasks.inclusionResolver);
    this.fees = this.createHasManyRepositoryFactoryFor('fees', feesRepositoryGetter,);
    this.registerInclusionResolver('fees', this.fees.inclusionResolver);
  }
}
