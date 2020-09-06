import {Entity, model, property} from '@loopback/repository';

@model()
export class Fees extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuid',
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'boolean',
    default: false,
  })
  isReceived?: boolean;

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

  @property({
    type: 'string',
  })
  casesId?: string;

  constructor(data?: Partial<Fees>) {
    super(data);
  }
}

export interface FeesRelations {
  // describe navigational properties here
}

export type FeesWithRelations = Fees & FeesRelations;
