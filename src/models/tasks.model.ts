import {Entity, model, property} from '@loopback/repository';

@model()
export class Tasks extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    defaultFn: 'uuid'
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isAlarmActive?: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  isDone?: boolean;

  @property({
    type: 'date',
    required: true,
  })
  deadline: string;

  @property({
    type: 'string',
  })
  CaseId?: string;

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


  constructor(data?: Partial<Tasks>) {
    super(data);
  }
}

export interface TasksRelations {
  // describe navigational properties here
}

export type TasksWithRelations = Tasks & TasksRelations;
