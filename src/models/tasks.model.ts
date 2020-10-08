import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Cases} from './cases.model';

@model()
export class Tasks extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
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
    required: false,
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
    type: "number",
    postgresql: {
      dataType: 'BIGINT',
    },
    required: false
  })
  deadline: number;

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

  @belongsTo(() => Cases)
  casesId?: string;

  constructor(data?: Partial<Tasks>) {
    super(data);
  }
}

export interface TasksRelations {
  // describe navigational properties here
}

export type TasksWithRelations = Tasks & TasksRelations;
