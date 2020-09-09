import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, getWhereSchemaFor, param, patch, post, requestBody} from '@loopback/rest';
import {basicAuthorization} from '../middlewares/auth.midd';
import {Attachments, Cases} from '../models';
import {CasesRepository} from '../repositories';
import {Roles} from './specs/user-controller.specs';

@authenticate('jwt')
export class CasesAttachmentsController {
  constructor(
    @repository(CasesRepository) protected casesRepository: CasesRepository,
  ) {}

  @get('/cases/{id}/attachments', {
    responses: {
      '200': {
        description: 'Array of Cases has many Attachments',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Attachments)},
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
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Attachments>,
  ): Promise<Attachments[]> {
    return this.casesRepository.attachments(id).find(filter);
  }

  @post('/cases/{id}/attachments', {
    responses: {
      '200': {
        description: 'Cases model instance',
        content: {'application/json': {schema: getModelSchemaRef(Attachments)}},
      },
    },
  })
  @authorize({
    allowedRoles: [Roles.CASE_CREATE],
    voters: [basicAuthorization],
  })
  async create(
    @param.path.string('id') id: typeof Cases.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Attachments, {
            title: 'NewAttachmentsInCases',
            exclude: ['id'],
            optional: ['casesId']
          }),
        },
      },
    }) attachments: Omit<Attachments, 'id'>,
  ): Promise<Attachments> {
    return this.casesRepository.attachments(id).create(attachments);
  }

  @patch('/cases/{id}/attachments', {
    responses: {
      '200': {
        description: 'Cases.Attachments PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authorize({
    allowedRoles: [Roles.CASE_CREATE],
    voters: [basicAuthorization],
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Attachments, {partial: true}),
        },
      },
    })
    attachments: Partial<Attachments>,
    @param.query.object('where', getWhereSchemaFor(Attachments)) where?: Where<Attachments>,
  ): Promise<Count> {
    return this.casesRepository.attachments(id).patch(attachments, where);
  }

  @del('/cases/{id}/attachments', {
    responses: {
      '200': {
        description: 'Cases.Attachments DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authorize({
    allowedRoles: [Roles.CASE_CREATE],
    voters: [basicAuthorization],
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Attachments)) where?: Where<Attachments>,
  ): Promise<Count> {
    return this.casesRepository.attachments(id).delete(where);
  }
}
