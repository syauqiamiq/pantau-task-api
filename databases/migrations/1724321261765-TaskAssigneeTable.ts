import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class TaskAssigneeTable1724321261765 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'task_assignees',
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
            name: 'task_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'project_member_id',
            type: 'integer',
            isNullable: true,
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
            name: 'IDX_TASK_ASSIGNEE_TASK_ID',
            columnNames: ['task_id'],
          },
          {
            name: 'IDX_TASK_ASSIGNEE_PROJECT_MEMBER_ID',
            columnNames: ['project_member_id'],
          },
        ],
        foreignKeys: [
          {
            columnNames: ['task_id'],
            referencedTableName: 'tasks',
            referencedColumnNames: ['id'],
            onUpdate: 'SET NULL',
            onDelete: 'SET NULL',
          },
          {
            columnNames: ['project_member_id'],
            referencedTableName: 'project_members',
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
    await queryRunner.dropTable('task_assignees', true, true, true);
  }
}
