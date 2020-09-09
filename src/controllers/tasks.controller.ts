import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, requestBody} from '@loopback/rest';
import {basicAuthorization} from '../middlewares/auth.midd';
import {Tasks} from '../models';
import {TasksRepository} from '../repositories';
import {Roles} from './specs/user-controller.specs';

@authenticate('jwt')
export class TasksController {
  constructor(
    @repository(TasksRepository)
    public tasksRepository: TasksRepository,
  ) {}

  @post('/tasks', {
    responses: {
      '200': {
        description: 'Tasks model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tasks)}},
      },
    },
  })
  @authorize({
    allowedRoles: [Roles.CASE_CREATE],
    voters: [basicAuthorization],
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tasks,
            {
              title: 'NewTasks',
              exclude: ['id']
            }),
        },
      },
    })
    tasks: Tasks,
  ): Promise<Tasks> {
    return this.tasksRepository.create(tasks);
  }

  @get('/tasks/count', {
    responses: {
      '200': {
        description: 'Tasks model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authorize({
    allowedRoles: [Roles.CASE_VIEW],
    voters: [basicAuthorization],
  })
  async count(
    @param.where(Tasks) where?: Where<Tasks>,
  ): Promise<Count> {
    return this.tasksRepository.count(where);
  }

  @get('/tasks', {
    responses: {
      '200': {
        description: 'Array of Tasks model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Tasks, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  @authorize({
    allowedRoles: [Roles.CASE_VIEW],
    voters: [basicAuthorization],
  })
  async find(
    @param.filter(Tasks) filter?: Filter<Tasks>,
  ): Promise<Tasks[]> {
    return this.tasksRepository.find(filter);
  }

  /*   @patch('/tasks', {
      responses: {
        '200': {
          description: 'Tasks PATCH success count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async updateAll(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Tasks, {partial: true}),
          },
        },
      })
      tasks: Tasks,
      @param.where(Tasks) where?: Where<Tasks>,
    ): Promise<Count> {
      return this.tasksRepository.updateAll(tasks, where);
    }
   */


  @get('/tasks/{id}', {
    responses: {
      '200': {
        description: 'Tasks model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Tasks, {includeRelations: true}),
          },
        },
      },
    },
  })
  @authorize({
    allowedRoles: [Roles.CASE_VIEW],
    voters: [basicAuthorization],
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Tasks, {exclude: 'where'}) filter?: FilterExcludingWhere<Tasks>
  ): Promise<Tasks> {
    return this.tasksRepository.findById(id, filter);
  }

  @patch('/tasks/{id}', {
    responses: {
      '204': {
        description: 'Tasks PATCH success',
      },
    },
  })
  @authorize({
    allowedRoles: [Roles.CASE_CREATE],
    voters: [basicAuthorization],
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tasks, {partial: true}),
        },
      },
    })
    tasks: Tasks,
  ): Promise<void> {
    await this.tasksRepository.updateById(id, tasks);
  }

  /*  @put('/tasks/{id}', {
     responses: {
       '204': {
         description: 'Tasks PUT success',
       },
     },
   })
   async replaceById(
     @param.path.string('id') id: string,
     @requestBody() tasks: Tasks,
   ): Promise<void> {
     await this.tasksRepository.replaceById(id, tasks);
   } */

  @del('/tasks/{id}', {
    responses: {
      '204': {
        description: 'Tasks DELETE success',
      },
    },
  })
  @authorize({
    allowedRoles: [Roles.CASE_CREATE],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tasksRepository.deleteById(id);
  }
}
