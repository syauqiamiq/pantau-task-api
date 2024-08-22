import { config } from 'src/config';
import { DataSourceOptions } from 'typeorm';
import { User } from './entities/user.entity';
import { UserCredential } from './entities/user-credential.entity';
import { UserAttachment } from './entities/user-attachment.entity';
import { Task } from './entities/task.entity';
import { TaskComment } from './entities/task-comment.entity';
import { TaskAttachment } from './entities/task-attachment.entity';
import { TaskAssignee } from './entities/task-assignee.entity';
import { Sprint } from './entities/sprint.entity';
import { Project } from './entities/project.entity';
import { ProjectTeam } from './entities/project-team.entity';
import { ProjectTeamMember } from './entities/project-team-member.entity';
import { ProjectMember } from './entities/project-member.entity';

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.name,
  entities: [
    User,
    UserCredential,
    UserAttachment,
    Task,
    TaskComment,
    TaskAttachment,
    TaskAssignee,
    Sprint,
    Project,
    ProjectTeam,
    ProjectTeamMember,
    ProjectMember,
  ],
  synchronize: false,
  logging: config.app.env === 'development',
  migrations: ['dist/databases/migrations/*{.ts,.js}'],
};
