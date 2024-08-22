import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IProjectMember } from '../interfaces/project-member.interface';
import { IProjectTeamMember } from '../interfaces/project-team-member.interface';
import { IProjectTeam } from '../interfaces/project-team.interface';
import { BaseEntity } from './base.entity';
import { ProjectMember } from './project-member.entity';
import { ProjectTeam } from './project-team.entity';

@Entity('project_team_members')
export class ProjectTeamMember
  extends BaseEntity
  implements IProjectTeamMember
{
  @Column({
    name: 'project_member_id',
    type: 'integer',
  })
  projectMemberId?: any;

  @Column({
    name: 'project_team_id',
    type: 'integer',
  })
  projectTeamId?: any;

  @JoinColumn({
    name: 'project_member_id',
    referencedColumnName: 'id',
  })
  @ManyToOne(() => ProjectMember)
  projectMember: IProjectMember;

  @JoinColumn({
    name: 'project_team_id',
    referencedColumnName: 'id',
  })
  @ManyToOne(() => ProjectTeam)
  projectTeam: IProjectTeam;
}
