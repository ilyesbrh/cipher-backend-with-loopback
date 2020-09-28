import {Entity, model, property} from '@loopback/repository';

@model()
export class Attachments extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
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
  link: string;

  @property({
    type: 'date',
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

  constructor(data?: Partial<Attachments>) {
    super(data);
  }
}

export interface AttachmentsRelations {
  // describe navigational properties here
}

export type AttachmentsWithRelations = Attachments & AttachmentsRelations;
