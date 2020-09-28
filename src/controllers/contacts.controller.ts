import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody
} from '@loopback/rest';
import {Contacts} from '../models';
import {ContactsRepository} from '../repositories';

export class ContactsController {
  constructor(
    @repository(ContactsRepository)
    public contactsRepository: ContactsRepository,
  ) {}

  @post('/contacts', {
    responses: {
      '200': {
        description: 'Contacts model instance',
        content: {'application/json': {schema: getModelSchemaRef(Contacts)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contacts, {
            title: 'NewContacts',

          }),
        },
      },
    })
    contacts: Contacts,
  ): Promise<Contacts> {
    return this.contactsRepository.create(contacts);
  }

  @get('/contacts/count', {
    responses: {
      '200': {
        description: 'Contacts model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Contacts) where?: Where<Contacts>,
  ): Promise<Count> {
    return this.contactsRepository.count(where);
  }

  @get('/contacts', {
    responses: {
      '200': {
        description: 'Array of Contacts model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Contacts, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Contacts) filter?: Filter<Contacts>,
  ): Promise<Contacts[]> {
    return this.contactsRepository.find(filter);
  }

  @patch('/contacts', {
    responses: {
      '200': {
        description: 'Contacts PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contacts, {partial: true}),
        },
      },
    })
    contacts: Contacts,
    @param.where(Contacts) where?: Where<Contacts>,
  ): Promise<Count> {
    return this.contactsRepository.updateAll(contacts, where);
  }

  @get('/contacts/{id}', {
    responses: {
      '200': {
        description: 'Contacts model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Contacts, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Contacts, {exclude: 'where'}) filter?: FilterExcludingWhere<Contacts>
  ): Promise<Contacts> {
    return this.contactsRepository.findById(id, filter);
  }

  @patch('/contacts/{id}', {
    responses: {
      '204': {
        description: 'Contacts PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contacts, {partial: true}),
        },
      },
    })
    contacts: Contacts,
  ): Promise<void> {
    await this.contactsRepository.updateById(id, contacts);
  }

  @put('/contacts/{id}', {
    responses: {
      '204': {
        description: 'Contacts PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() contacts: Contacts,
  ): Promise<void> {
    await this.contactsRepository.replaceById(id, contacts);
  }

  @del('/contacts/{id}', {
    responses: {
      '204': {
        description: 'Contacts DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.contactsRepository.deleteById(id);
  }
}
