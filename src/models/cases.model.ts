import {Entity, model, property} from '@loopback/repository';

@model()
export class Cases extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    defaultFn: 'uuid',
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
    required: true,
  })
  client: string;

  @property({
    type: 'string',
    required: true,
  })
  opponent: string;

  @property({
    type: 'string',
    required: true,
  })
  tags: string;

  @property({
    type: 'string',
    required: true,
  })
  location: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isSaved?: boolean;

  @property({
    type: 'string',
    default: 'active',
  })
  state?: string;

  @property({
    type: 'string',
  })
  Jugement?: string;

  @property({
    type: 'date',
  })
  JugementDate?: string;

  @property({
    type: 'number',
    default: 0,
  })
  totalDetes?: number;

  @property({
    type: 'date',
    default: () => new Date()
  })
  createdAt?: string;

  @property({
    type: 'date',
    default: () => new Date()
  })
  updatedAt?: string;


  constructor(data?: Partial<Cases>) {
    super(data);
  }
}

export interface CasesRelations {
  // describe navigational properties here
}

export type CasesWithRelations = Cases & CasesRelations;
