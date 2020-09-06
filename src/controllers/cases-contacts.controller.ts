import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, getWhereSchemaFor, param, post, requestBody} from '@loopback/rest';
import {basicAuthorization} from '../middlewares/auth.midd';
import {Cases, Contacts} from '../models';
import {CasesRepository} from '../repositories';
import {Roles} from './specs/user-controller.specs';

@authenticate('jwt')
export class CasesContactsController {
  constructor(
    @repository(CasesRepository) protected casesRepository: CasesRepository,
  ) {}

  @get('/cases/{id}/contacts', {
    responses: {
      '200': {
        description: 'Cases has one Contacts',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Contacts),
          },
        },
      },
    },
  })
  @authorize({
    allowedRoles: [Roles.CASE_VIEW],
    voters: [basicAuthorization],
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Contacts>,
  ): Promise<Contacts> {
    return this.casesRepository.contacts(id).get(filter);
  }

  @post('/cases/{id}/contacts', {
    responses: {
      '200': {
        description: 'Cases model instance',
        content: {'application/json': {schema: getModelSchemaRef(Contacts)}},
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
          schema: getModelSchemaRef(Contacts, {
            title: 'NewContactsInCases',
            exclude: ['id'],
            optional: ['casesId']
          }),
        },
      },
    }) contacts: Omit<Contacts, 'id'>,
  ): Promise<Contacts> {
    return this.casesRepository.contacts(id).create(contacts);
  }

  /*  @patch('/cases/{id}/contacts', {
     responses: {
       '200': {
         description: 'Cases.Contacts PATCH success count',
         content: {'application/json': {schema: CountSchema}},
       },
     },
   })

   async patch(
     @param.path.string('id') id: string,
     @requestBody({
       content: {
         'application/json': {
           schema: getModelSchemaRef(Contacts, {partial: true}),
         },
       },
     })
     contacts: Partial<Contacts>,
     @param.query.object('where', getWhereSchemaFor(Contacts)) where?: Where<Contacts>,
   ): Promise<Count> {
     return this.casesRepository.contacts(id).patch(contacts, where);
   } */

  @del('/cases/{id}/contacts', {
    responses: {
      '200': {
        description: 'Cases.Contacts DELETE success count',
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
    @param.query.object('where', getWhereSchemaFor(Contacts)) where?: Where<Contacts>,
  ): Promise<Count> {
    return this.casesRepository.contacts(id).delete(where);
  }
}
