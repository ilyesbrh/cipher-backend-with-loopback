import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, getWhereSchemaFor, param, patch, post, requestBody} from '@loopback/rest';
import {Cases, Tasks} from '../models';
import {CasesRepository} from '../repositories';

export class CasesTasksController {
  constructor(
    @repository(CasesRepository) protected casesRepository: CasesRepository,
  ) {}

  @get('/cases/{id}/tasks', {
    responses: {
      '200': {
        description: 'Array of Cases has many Tasks',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tasks)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Tasks>,
  ): Promise<Tasks[]> {
    return this.casesRepository.tasks(id).find(filter);
  }

  @post('/cases/{id}/tasks', {
    responses: {
      '200': {
        description: 'Cases model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tasks)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cases.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tasks, {
            title: 'NewTasksInCases',
            exclude: ['id'],
            optional: ['casesId']
          }),
        },
      },
    }) tasks: Omit<Tasks, 'id'>,
  ): Promise<Tasks> {
    return this.casesRepository.tasks(id).create(tasks);
  }

  @patch('/cases/{id}/tasks', {
    responses: {
      '200': {
        description: 'Cases.Tasks PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tasks, {partial: true}),
        },
      },
    })
    tasks: Partial<Tasks>,
    @param.query.object('where', getWhereSchemaFor(Tasks)) where?: Where<Tasks>,
  ): Promise<Count> {
    return this.casesRepository.tasks(id).patch(tasks, where);
  }

  @del('/cases/{id}/tasks', {
    responses: {
      '200': {
        description: 'Cases.Tasks DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Tasks)) where?: Where<Tasks>,
  ): Promise<Count> {
    return this.casesRepository.tasks(id).delete(where);
  }
}
