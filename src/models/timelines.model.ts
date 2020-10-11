import {Entity, model, property} from '@loopback/repository';

@model()
export class Timelines extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuid',
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'boolean',
    required: false,
    default: () => true
  })
  /* true is left side , wa 3akso sahih xD */
  side?: boolean;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: "number",
    postgresql: {
      dataType: 'BIGINT',
    },
    required: false,
    default: () => new Date().getTime()
  })
  time: number;

  @property({
    type: "number",
    postgresql: {
      dataType: 'BIGINT',
    },
    required: false,
    default: () => new Date().getTime()
  })
  createdAt?: number;

  @property({
    type: "number",
    postgresql: {
      dataType: 'BIGINT',
    },
    required: false,
    default: () => new Date().getTime()
  })
  updatedAt?: number;

  @property({
    type: 'string',
  })
  casesId?: string;

  constructor(data?: Partial<Timelines>) {
    super(data);
  }
}

export interface TimelinesRelations {
  // describe navigational properties here
}

export type TimelinesWithRelations = Timelines & TimelinesRelations;
