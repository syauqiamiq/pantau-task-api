import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ITaskComment } from '../interfaces/task-comment.interface';
import { Task } from './task.entity';
import { ITask } from '../interfaces/task.interface';
import { ProjectMember } from './project-member.entity';
import { IProjectMember } from '../interfaces/project-member.interface';
import { BaseEntity } from './base.entity';

@Entity('task_comments')
export class TaskComment extends BaseEntity implements ITaskComment {
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

  @Column({
    name: 'comment',
    type: 'text',
  })
  comment?: string;

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
