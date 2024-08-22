import { SprintStatusEnum } from 'src/common/enums/sprint-status.enum';
import { IBaseEntity } from './base.interface';
import { IProject } from './project.interface';
import { ITask } from './task.interface';

export interface ISprint extends IBaseEntity {
  projectId?: number | any;
  name?: string;
  startDate?: string | any;
  endDate?: string | any;
  goal?: string;
  status?: SprintStatusEnum | any;
  project: IProject;
  tasks: ITask[];
}
