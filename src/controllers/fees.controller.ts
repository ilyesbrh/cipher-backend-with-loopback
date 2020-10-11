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
  ): Promise<{totalDetes: number, totalPrices: number, totalPayed: number}> {
    const result = await this.casesRepository.execute('SELECT  sum(price) as price, sum(totaldetes) as debts FROM public.cases;');

    const price = parseInt(result[0].price);
    const debt = parseInt(result[0].debts);

    console.log({
      totalDetes: debt,
      totalPrices: price,
      totalPayed: price - debt
    });

    return {
      totalDetes: debt,
      totalPrices: price,
      totalPayed: price - debt
    };

  }

}
