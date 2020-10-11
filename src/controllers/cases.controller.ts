import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, requestBody} from '@loopback/rest';
import {basicAuthorization} from '../middlewares/auth.midd';
import {Cases} from '../models';
import {CasesRepository} from '../repositories';
import {Roles} from './specs/user-controller.specs';

@authenticate('jwt')
export class CasesController {
  constructor(
    @repository(CasesRepository)
    public casesRepository: CasesRepository,
  ) {}

  @post('/cases', {
    responses: {
      '200': {
        description: 'Cases model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cases)}},
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
          schema: getModelSchemaRef(Cases, {
            title: 'NewCases',
            exclude: ['totalDetes', 'createdAt', 'updatedAt']
          }),
        },
      },
    })
    cases: Cases,
  ): Promise<Cases> {

    cases.totalDetes = cases.price;

    return this.casesRepository.create(cases);
  }

  @get('/cases/count', {
    responses: {
      '200': {
        description: 'Cases model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authorize({
    allowedRoles: [Roles.CASE_VIEW],
    voters: [basicAuthorization],
  })
  async count(
    @param.where(Cases) where?: Where<Cases>,
  ): Promise<Count> {
    return this.casesRepository.count(where);
  }

  @get('/cases', {
    responses: {
      '200': {
        description: 'Array of Cases model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Cases, {includeRelations: true}),
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
    @param.filter(Cases) filter?: Filter<Cases>,
  ): Promise<Cases[]> {
    return this.casesRepository.find(filter);
  }


  /*  @patch('/cases', {
     responses: {
       '200': {
         description: 'Cases PATCH success count',
         content: {'application/json': {schema: CountSchema}},
       },
     },
   })
   async updateAll(
     @requestBody({
       content: {
         'application/json': {
           schema: getModelSchemaRef(Cases, {partial: true}),
         },
       },
     })
     cases: Cases,
     @param.where(Cases) where?: Where<Cases>,
   ): Promise<Count> {
     return this.casesRepository.updateAll(cases, where);
   } */


  @get('/cases/{id}', {
    responses: {
      '200': {
        description: 'Cases model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cases, {includeRelations: true}),
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
    @param.filter(Cases, {exclude: 'where'}) filter?: FilterExcludingWhere<Cases>
  ): Promise<Cases> {
    return this.casesRepository.findById(id, filter);
  }

  @patch('/cases/{id}', {
    responses: {
      '204': {
        description: 'Cases PATCH success',
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
          schema: getModelSchemaRef(Cases, {partial: true}),
        },
      },
    })
    cases: Cases,
  ): Promise<void> {
    await this.casesRepository.updateById(id, cases);
  }

  /*  @put('/cases/{id}', {
     responses: {
       '204': {
         description: 'Cases PUT success',
       },
     },
   })
   async replaceById(
     @param.path.string('id') id: string,
     @requestBody() cases: Cases,
   ): Promise<void> {
     await this.casesRepository.replaceById(id, cases);
   }
  */

  @del('/cases/{id}', {
    responses: {
      '204': {
        description: 'Cases DELETE success',
      },
    },
  })
  @authorize({
    allowedRoles: [Roles.CASE_CREATE],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.casesRepository.deleteById(id);
  }
}
