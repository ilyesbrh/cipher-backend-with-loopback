import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Cases,
  Timelines,
} from '../models';
import {CasesRepository} from '../repositories';

export class CasesTimelinesController {
  constructor(
    @repository(CasesRepository) protected casesRepository: CasesRepository,
  ) { }

  @get('/cases/{id}/timelines', {
    responses: {
      '200': {
        description: 'Array of Cases has many Timelines',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Timelines)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Timelines>,
  ): Promise<Timelines[]> {
    return this.casesRepository.timelines(id).find(filter);
  }

  @post('/cases/{id}/timelines', {
    responses: {
      '200': {
        description: 'Cases model instance',
        content: {'application/json': {schema: getModelSchemaRef(Timelines)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cases.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Timelines, {
            title: 'NewTimelinesInCases',
            exclude: ['id'],
            optional: ['casesId']
          }),
        },
      },
    }) timelines: Omit<Timelines, 'id'>,
  ): Promise<Timelines> {
    return this.casesRepository.timelines(id).create(timelines);
  }

  @patch('/cases/{id}/timelines', {
    responses: {
      '200': {
        description: 'Cases.Timelines PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Timelines, {partial: true}),
        },
      },
    })
    timelines: Partial<Timelines>,
    @param.query.object('where', getWhereSchemaFor(Timelines)) where?: Where<Timelines>,
  ): Promise<Count> {
    return this.casesRepository.timelines(id).patch(timelines, where);
  }

  @del('/cases/{id}/timelines', {
    responses: {
      '200': {
        description: 'Cases.Timelines DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Timelines)) where?: Where<Timelines>,
  ): Promise<Count> {
    return this.casesRepository.timelines(id).delete(where);
  }
}
