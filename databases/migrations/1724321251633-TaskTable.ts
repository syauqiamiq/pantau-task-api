import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class TaskTable1724321251633 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'uuid',
            type: 'uuid',
            generationStrategy: 'uuid',
            isUnique: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'sprint_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'project_team_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'task_type',
            type: 'varchar',
            isNullable: false,
            comment: 'REGULAR,BUG',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: true,
            comment: 'TODO,IN_PROGRESS,DONE',
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
        indices: [
          {
            name: 'IDX_TASK_SPRINT_ID',
            columnNames: ['sprint_id'],
          },
          {
            name: 'IDX_TASK_PROJECT_TEAM_ID',
            columnNames: ['project_team_id'],
          },
        ],
        foreignKeys: [
          {
            columnNames: ['sprint_id'],
            referencedTableName: 'sprints',
            referencedColumnNames: ['id'],
            onUpdate: 'SET NULL',
            onDelete: 'SET NULL',
          },
          {
            columnNames: ['project_team_id'],
            referencedTableName: 'project_teams',
            referencedColumnNames: ['id'],
            onUpdate: 'SET NULL',
            onDelete: 'SET NULL',
          },
        ],
      }),
      true,
      true,
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks', true, true, true);
  }
}
