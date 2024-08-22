import { Column, Entity, OneToMany } from 'typeorm';
import { IProject } from '../interfaces/project.interface';
import { ProjectMember } from './project-member.entity';
import { IProjectMember } from '../interfaces/project-member.interface';
import { ProjectTeam } from './project-team.entity';
import { IProjectTeam } from '../interfaces/project-team.interface';
import { Sprint } from './sprint.entity';
import { ISprint } from '../interfaces/sprint.interface';
import { BaseEntity } from './base.entity';

@Entity('projects')
export class Project extends BaseEntity implements IProject {
  @Column({
    name: 'name',
    type: 'varchar',
  })
  name?: any;

  @Column({
    name: 'key',
    type: 'varchar',
  })
  key?: any;

  @OneToMany(() => ProjectMember, (data) => data.project)
  projectMembers: IProjectMember[];

  @OneToMany(() => ProjectTeam, (data) => data.project)
  projectTeams: IProjectTeam[];

  @OneToMany(() => Sprint, (data) => data.project)
  sprints: ISprint[];
}
