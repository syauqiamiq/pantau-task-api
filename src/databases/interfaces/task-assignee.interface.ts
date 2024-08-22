import { IBaseEntity } from './base.interface';
import { IProjectMember } from './project-member.interface';
import { ITask } from './task.interface';

export interface ITaskAssignee extends IBaseEntity {
  taskId?: number | any;
  projectMemberId?: number | any;
  task: ITask;
  projectMember: IProjectMember;
}
