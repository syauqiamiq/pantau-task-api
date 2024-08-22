import { IBaseEntity } from './base.interface';
import { ITask } from './task.interface';

export interface ITaskAttachment extends IBaseEntity {
  taskId?: number | any;
  path?: string;
  documentName?: string;
  task?: ITask;
}
