import { IBaseEntity } from './base.interface';
import { IProjectMember } from './project-member.interface';
import { IProjectTeam } from './project-team.interface';
import { ISprint } from './sprint.interface';

export interface IProject extends IBaseEntity {
  name?: string;
  key?: string;
  sprints?: ISprint[];
  projectTeams?: IProjectTeam[];
  projectMembers?: IProjectMember[];
}
