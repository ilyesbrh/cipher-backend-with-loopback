import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Contacts} from './contacts.model';
import {Fees} from './fees.model';
import {Tasks} from './tasks.model';
import {Attachments} from './attachments.model';
import {Timelines} from './timelines.model';

@model()
export class Cases extends Entity {
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

  @hasOne(() => Contacts)
  contacts: Contacts;

  @hasMany(() => Fees)
  fees: Fees[];

  @hasMany(() => Tasks)
  tasks: Tasks[];

  @hasMany(() => Attachments)
  attachments: Attachments[];

  @hasMany(() => Timelines)
  timelines: Timelines[];

  constructor(data?: Partial<Cases>) {
    super(data);
  }
}

export interface CasesRelations {
  // describe navigational properties here
}

export type CasesWithRelations = Cases & CasesRelations;
