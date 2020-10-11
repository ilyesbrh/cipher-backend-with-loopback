import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, getWhereSchemaFor, HttpErrors, param, patch, post, requestBody} from '@loopback/rest';
import {basicAuthorization} from '../middlewares/auth.midd';
import {Cases, Fees} from '../models';
import {CasesRepository} from '../repositories';
import {Roles} from './specs/user-controller.specs';

@authenticate('jwt')
export class CasesFeesController {
  constructor(
    @repository(CasesRepository) protected casesRepository: CasesRepository,
  ) {}


  @get('/cases/{id}/fees', {
    responses: {
      '200': {
        description: 'Array of Cases has many Fees',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Fees)},
          },
        },
      },
    },
  })
  @authorize({
    allowedRoles: [Roles.FEES_VIEW],
    voters: [basicAuthorization],
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Fees>,
  ): Promise<Fees[]> {
    return this.casesRepository.fees(id).find(filter);
  }

  @post('/cases/{id}/fees', {
    responses: {
      '200': {
        description: 'Cases model instance',
        content: {'application/json': {schema: getModelSchemaRef(Fees)}},
      },
    },
  })
  @authorize({
    allowedRoles: [Roles.FEES_CREATE],
    voters: [basicAuthorization],
  })
  async create(
    @param.path.string('id') id: typeof Cases.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fees, {
            title: 'NewFeesInCases',
            exclude: ['id', 'casesId', 'isReceived', 'createdAt', 'updatedAt']
          }),
        },
      },
    }) fees: Omit<Fees, 'id'>,
  ): Promise<Fees> {

    try {
      const c = await this.casesRepository.findOne({where: {id}}) as Cases;

      c.totalDetes -= fees.amount;
      await this.casesRepository.update(c);

      fees.isReceived = false;
      return await this.casesRepository.fees(id).create(fees);

    } catch (error) {
      throw new HttpErrors[404]('something wrong happens');
    }
  }

  @patch('/cases/{id}/fees', {
    responses: {
      '200': {
        description: 'Cases.Fees PATCH success count',
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
          schema: getModelSchemaRef(Fees, {partial: true}),
        },
      },
    })
    fees: Partial<Fees>,
    @param.query.object('where', getWhereSchemaFor(Fees)) where?: Where<Fees>,
  ): Promise<Count> {

    try {
      const c = await this.casesRepository.findOne({where: {id}}) as Cases;
      const f = await this.casesRepository.fees(id).find({where});

      c.totalDetes += f[0].amount;

      c.totalDetes -= fees.amount ? fees.amount : 0;


      await this.casesRepository.update(c);

      fees.isReceived = false;

      return await this.casesRepository.fees(id).patch(fees, where);

    } catch (error) {
      throw new HttpErrors[404]('something wrong happens');
    }
  }

  @del('/cases/{id}/fees', {
    responses: {
      '200': {
        description: 'Cases.Fees DELETE success count',
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
    @param.query.object('where', getWhereSchemaFor(Fees)) where?: Where<Fees>,
  ): Promise<Count> {

    try {
      const c = await this.casesRepository.findOne({where: {id}}) as Cases;
      const f = await this.casesRepository.fees(id).find({where});

      c.totalDetes += f[0].amount;

      await this.casesRepository.update(c);

      return await this.casesRepository.fees(id).delete(where);

    } catch (error) {
      throw new HttpErrors[404]('something wrong happens');
    }


  }
}
