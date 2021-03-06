import {Entity, model, property} from '@loopback/repository';

@model()
export class Contacts extends Entity {
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
  fullName: string;

  @property({
    type: 'string',
  })
  father?: string;

  @property({
    type: 'string',
  })
  mother?: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'date',
  })
  birthday?: string;

  @property({
    type: 'string',
  })
  role?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  email?: string;

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

  constructor(data?: Partial<Contacts>) {
    super(data);
  }
}

export interface ContactsRelations {
  // describe navigational properties here
}

export type ContactsWithRelations = Contacts & ContactsRelations;
