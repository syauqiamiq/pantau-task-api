import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ITaskAssignee } from '../interfaces/task-assignee.interface';
import { Task } from './task.entity';
import { ITask } from '../interfaces/task.interface';
import { ProjectMember } from './project-member.entity';
import { IProjectMember } from '../interfaces/project-member.interface';
import { BaseEntity } from './base.entity';

@Entity('task_assignees')
export class TaskAssignee extends BaseEntity implements ITaskAssignee {
  @Column({
    name: 'task_id',
    type: 'integer',
  })
  taskId?: any;

  @Column({
    name: 'project_member_id',
    type: 'integer',
  })
  projectMemberId?: any;

  @JoinColumn({
    name: 'task_id',
    referencedColumnName: 'id',
  })
  @ManyToOne(() => Task)
  task: ITask;

  @JoinColumn({
    name: 'project_member_id',
    referencedColumnName: 'id',
  })
  @ManyToOne(() => ProjectMember)
  projectMember: IProjectMember;
}
