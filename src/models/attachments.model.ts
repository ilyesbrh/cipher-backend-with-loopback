import {Entity, model, property} from '@loopback/repository';

@model()
export class Attachments extends Entity {
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
  link: string;

  @property({
    type: 'string',
    required: true,
  })
  caseId: string;

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


  constructor(data?: Partial<Attachments>) {
    super(data);
  }
}

export interface AttachmentsRelations {
  // describe navigational properties here
}

export type AttachmentsWithRelations = Attachments & AttachmentsRelations;
