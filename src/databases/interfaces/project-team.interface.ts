import { IBaseEntity } from './base.interface';
import { IProjectTeamMember } from './project-team-member.interface';
import { IProject } from './project.interface';
import { ITask } from './task.interface';

export interface IProjectTeam extends IBaseEntity {
  projectId?: number | any;
  name?: string;
  project?: IProject;
  projectTeamMembers?: IProjectTeamMember[];
  tasks?: ITask[];
}
