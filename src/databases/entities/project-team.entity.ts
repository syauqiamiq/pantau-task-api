import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { IProjectTeam } from '../interfaces/project-team.interface';
import { ProjectTeamMember } from './project-team-member.entity';
import { IProjectTeamMember } from '../interfaces/project-team-member.interface';
import { Project } from './project.entity';
import { IProject } from '../interfaces/project.interface';
import { BaseEntity } from './base.entity';
import { Task } from './task.entity';
import { ITask } from '../interfaces/task.interface';

@Entity('project_teams')
export class ProjectTeam extends BaseEntity implements IProjectTeam {
  @Column({
    name: 'project_id',
    type: 'integer',
  })
  project_id?: any;

  @Column({
    name: 'name',
    type: 'varchar',
  })
  name?: any;

  @JoinColumn({
    name: 'project_id',
    referencedColumnName: 'id',
  })
  @ManyToOne(() => Project)
  project: IProject;

  @OneToMany(() => ProjectTeamMember, (data) => data.projectTeam)
  projectTeamMembers: IProjectTeamMember[];

  @OneToMany(() => Task, (data) => data.projectTeam)
  tasks: ITask[];
}
