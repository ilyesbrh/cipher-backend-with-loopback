import {repository, Where} from '@loopback/repository';
import {param, get} from '@loopback/rest';
import {Fees} from '../models';
import {CasesRepository, FeesRepository} from '../repositories';

export declare const StatsSchema: {
  type: string;
  title: string;
  'x-typescript-type': string;
  properties: {
    TotalDetes: {
      type: number;
    };
    TotalPrices: {
      type: number;
    };
    TotalPayed: {
      type: number;
    };
    TotalCases: {
      type: number;
    };
    TotalActive: {
      type: number;
    };
    TotalArchive: {
      type: number;
    }
  };
};

export class FeesController {
  constructor(
    @repository(FeesRepository)
    public feesRepository: FeesRepository,
    @repository(CasesRepository)
    public casesRepository: CasesRepository,

  ) {}


  @get('/fees/stats', {
    responses: {
      '200': {
        description: 'Fees model count',
        content: {'application/json': {schema: StatsSchema}},
      },
    },
  })
  async count(
    @param.where(Fees) where?: Where<Fees>,
  ): Promise<Object> {

    const fees = await this.casesRepository.execute('SELECT  sum(price) as price, sum(totaldetes) as debts FROM public.cases');
    const allCases = await this.casesRepository.execute('SELECT count(id) as totalCases from public.cases');
    const activeCases = await this.casesRepository.execute("SELECT count(id) as totalActive from public.cases  where public.cases.state = 'Active'");

    console.log(allCases);
    console.log(activeCases);

    const price = parseInt(fees[0].price);
    const debt = parseInt(fees[0].debts);
    const cases = parseInt(allCases[0].totalcases);
    const active = parseInt(activeCases[0].totalactive);

    return {
      totalDetes: debt,
      totalPrices: price,
      totalPayed: price - debt,
      totalCases: cases,
      totalActive: active,
      totalArchived: cases - active
    };

  }

}
