import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ISprint } from '../interfaces/sprint.interface';
import { SprintStatusEnum } from 'src/common/enums/sprint-status.enum';
import { Project } from './project.entity';
import { IProject } from '../interfaces/project.interface';
import { Task } from './task.entity';
import { ITask } from '../interfaces/task.interface';
import { BaseEntity } from './base.entity';

@Entity('sprints')
export class Sprint extends BaseEntity implements ISprint {
  @Column({
    name: 'name',
    type: 'varchar',
  })
  name?: any;

  @Column({
    name: 'project_id',
    type: 'integer',
  })
  project_id?: any;

  @Column({
    name: 'start_date',
    type: 'timestamptz',
  })
  start_date?: any;

  @Column({
    name: 'end_date',
    type: 'timestamptz',
  })
  end_date?: any;

  @Column({
    name: 'goal',
    type: 'text',
  })
  goal?: string;

  @Column({
    name: 'status',
    type: 'varchar',
  })
  status?: SprintStatusEnum;

  @JoinColumn({
    name: 'project_id',
    referencedColumnName: 'id',
  })
  @ManyToOne(() => Project)
  project: IProject;

  @OneToMany(() => Task, (data) => data.sprint)
  tasks: ITask[];
}
