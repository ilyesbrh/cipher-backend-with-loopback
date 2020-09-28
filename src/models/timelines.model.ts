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
    type: 'string',
  })
  description?: string;

  @property({
    type: 'date',
    required: true,
  })
  time: string;

  @property({
    type: "date",
    postgresql: {
      dataType: 'TIMESTAMP',
    },
    required: false,
    default: () => new Date().getTime()
  })
  createdAt?: number;

  @property({
    type: "date",
    postgresql: {
      dataType: 'TIMESTAMP',
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
