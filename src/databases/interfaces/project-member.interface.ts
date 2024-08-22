import { IBaseEntity } from './base.interface';
import { IProjectTeam } from './project-team.interface';
import { IProject } from './project.interface';
import { ITaskComment } from './task-comment.interface';
import { ITask } from './task.interface';
import { IUser } from './user.interface';

export interface IProjectMember extends IBaseEntity {
  userId?: number | any;
  projectId?: number | any;
  user?: IUser;
  project?: IProject;
  taskComments?: ITaskComment[];
  tasks?: ITask[];
  projectTeams?: IProjectTeam[];
}
