import { IBaseEntity } from './base.interface';
import { IProjectMember } from './project-member.interface';
import { IProjectTeam } from './project-team.interface';

export interface IProjectTeamMember extends IBaseEntity {
  projectMemberId?: number | any;
  projectTeamId?: number | any;
  projectMember?: IProjectMember;
  projectTeam?: IProjectTeam;
}
