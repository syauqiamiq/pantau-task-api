import { IBaseEntity } from './base.interface';
import { IProjectMember } from './project-member.interface';
import { ITask } from './task.interface';

export interface ITaskComment extends IBaseEntity {
  taskId?: number | any;
  comment?: string;
  projectMemberId?: number | any;
  task?: ITask;
  projectMember?: IProjectMember;
}
