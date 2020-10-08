import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Tasks,
  Cases,
} from '../models';
import {TasksRepository} from '../repositories';

export class TasksCasesController {
  constructor(
    @repository(TasksRepository)
    public tasksRepository: TasksRepository,
  ) { }

  @get('/tasks/{id}/cases', {
    responses: {
      '200': {
        description: 'Cases belonging to Tasks',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cases)},
          },
        },
      },
    },
  })
  async getCases(
    @param.path.string('id') id: typeof Tasks.prototype.id,
  ): Promise<Cases> {
    return this.tasksRepository.cases(id);
  }
}
