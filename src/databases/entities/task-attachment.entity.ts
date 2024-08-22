import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ITaskAttachment } from '../interfaces/task-attachment.interface';
import { Task } from './task.entity';
import { ITask } from '../interfaces/task.interface';
import { BaseEntity } from './base.entity';

@Entity('task_attachments')
export class TaskAttachment extends BaseEntity implements ITaskAttachment {
  @Column({
    name: 'task_id',
    type: 'integer',
  })
  taskId?: any;
  @Column({
    name: 'document_name',
    type: 'varchar',
  })
  documentName?: string;

  @Column({
    name: 'path',
    type: 'varchar',
  })
  path?: string;

  @JoinColumn({
    name: 'task_id',
    referencedColumnName: 'id',
  })
  @ManyToOne(() => Task)
  task: ITask;
}
