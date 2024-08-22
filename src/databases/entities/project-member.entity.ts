import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { IProjectMember } from '../interfaces/project-member.interface';
import { Project } from './project.entity';
import { IProject } from '../interfaces/project.interface';
import { User } from './user.entity';
import { IUser } from '../interfaces/user.interface';
import { BaseEntity } from './base.entity';
import { IProjectTeam } from '../interfaces/project-team.interface';
import { ProjectTeam } from './project-team.entity';
import { Task } from './task.entity';
import { TaskComment } from './task-comment.entity';
import { ITaskComment } from '../interfaces/task-comment.interface';

@Entity('project_members')
export class ProjectMember extends BaseEntity implements IProjectMember {
  @Column({
    name: 'user_id',
    type: 'integer',
  })
  userId?: any;
  @Column({
    name: 'project_id',
    type: 'integer',
  })
  project_id?: any;

  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  @ManyToOne(() => User)
  user: IUser;

  @JoinColumn({
    name: 'project_id',
    referencedColumnName: 'id',
  })
  @ManyToOne(() => Project)
  project: IProject;

  @ManyToMany(() => ProjectTeam)
  @JoinTable()
  projectTeams?: IProjectTeam[];

  @ManyToMany(() => Task)
  @JoinTable()
  tasks?: IProjectTeam[];

  @OneToMany(() => TaskComment, (data) => data.projectMember)
  taskComments?: ITaskComment[];
}
