import { TaskStatusEnum, TaskTypeEnum } from 'src/common/enums/task.enum';
import { IBaseEntity } from './base.interface';
import { ITaskComment } from './task-comment.interface';
import { ITaskAttachment } from './task-attachment.interface';
import { ITaskAssignee } from './task-assignee.interface';
import { ISprint } from './sprint.interface';
import { IProjectTeam } from './project-team.interface';

export interface ITask extends IBaseEntity {
  sprintId?: number | any;
  taskType?: TaskTypeEnum;
  title?: string;
  description?: string;
  status?: TaskStatusEnum;
  projectTeamId?: number | any;
  taskComments?: ITaskComment[];
  taskAttachments?: ITaskAttachment[];
  taskAssignees?: ITaskAssignee[];
  sprint?: ISprint;
  projectTeam?: IProjectTeam;
}
