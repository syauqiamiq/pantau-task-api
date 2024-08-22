import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ITask } from '../interfaces/task.interface';
import { TaskStatusEnum, TaskTypeEnum } from 'src/common/enums/task.enum';
import { Sprint } from './sprint.entity';
import { ISprint } from '../interfaces/sprint.interface';
import { ProjectTeam } from './project-team.entity';
import { IProjectTeam } from '../interfaces/project-team.interface';
import { TaskAssignee } from './task-assignee.entity';
import { ITaskAssignee } from '../interfaces/task-assignee.interface';
import { TaskAttachment } from './task-attachment.entity';
import { ITaskAttachment } from '../interfaces/task-attachment.interface';
import { TaskComment } from './task-comment.entity';
import { ITaskComment } from '../interfaces/task-comment.interface';
import { BaseEntity } from './base.entity';

@Entity('tasks')
export class Task extends BaseEntity implements ITask {
  @Column({
    name: 'sprint_id',
    type: 'integer',
  })
  sprintId?: any;

  @Column({
    name: 'project_team_id',
    type: 'integer',
  })
  projectTeamId?: any;

  @Column({
    name: 'task_type',
    type: 'varchar',
  })
  taskType?: TaskTypeEnum;

  @Column({
    name: 'status',
    type: 'varchar',
  })
  status?: TaskStatusEnum;

  @Column({
    name: 'title',
    type: 'varchar',
  })
  title?: string;

  @Column({
    name: 'description',
    type: 'text',
  })
  description?: string;

  @JoinColumn({
    name: 'sprint_id',
    referencedColumnName: 'id',
  })
  @ManyToOne(() => Sprint)
  sprint: ISprint;

  @JoinColumn({
    name: 'project_team_id',
    referencedColumnName: 'id',
  })
  @ManyToOne(() => ProjectTeam)
  projectTeam: IProjectTeam;

  @OneToMany(() => TaskAssignee, (data) => data.task)
  taskAssignees: ITaskAssignee[];

  @OneToMany(() => TaskAttachment, (data) => data.task)
  taskAttachments: ITaskAttachment[];

  @OneToMany(() => TaskComment, (data) => data.task)
  taskComments: ITaskComment[];
}
